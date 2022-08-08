define("StTransportPage", ["css!StTransportPageCSS"], function() {
	return {
		entitySchemaName: "StTransport",
		attributes: {
			"StName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				
				dependencies: [
					{
						columns: ["StNumber", "StCarBrand", "StCarModel", "StMaxWeight"],
						method: "generateName"
					}
				]
			},
			isChangeFieldButtonEnabled:{
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},
		messages: {
			"BROADCASTMessageToPublish": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		modules: /**SCHEMA_MODULES*/{
			"DFCalculationIndicator1e68c84a-1e82-48e0-b30a-836bb85bc514": {
				"moduleId": "DFCalculationIndicator1e68c84a-1e82-48e0-b30a-836bb85bc514",
				"moduleName": "CardWidgetModule",
				"config": {
					"parameters": {
						"viewModelConfig": {
							"widgetKey": "DFCalculationIndicator1e68c84a-1e82-48e0-b30a-836bb85bc514",
							"recordId": "65436413-0804-4131-b6fa-50683cbe50b8",
							"primaryColumnValue": {
								"getValueMethod": "getPrimaryColumnValue"
							}
						}
					}
				}
			},
			"ContactProfile": {
                "config": {
                    "schemaName": "StContactProfileSchema",
                    "isSchemaConfigInitialized": true,
                    "useHistoryState": false,
                    "parameters": {
                        "viewModelConfig": {
                            masterColumnName: "StMainDriver"
                        }
                    }
                }
            }
		}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "StTransportFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "StTransport"
				}
			},
			"StVoyageDetail": {
				"schemaName": "StVoyageDetail",
				"entitySchemaName": "StVoyage",
				"filter": {
					"detailColumn": "StTransport",
					"masterColumn": "Id"
				}
			},
            "StConfigurationDetail": {
                "schemaName": "StConfigurationDetail",
                "filter": {
                    "detailColumn": "StTransport",
                    "masterColumn": "Id"
                }
            }
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function(){
				this.callParent(arguments);
				this.on("change:StCarBrand", this.generateName);
				this.on("change:StCarModel", this.generateName);
				this.sandbox.subscribe("BROADCASTMessageToPublish", this.onMessageSubscribe, this, ["resultTag"]);
				this.sandbox.loadModule("StTestSandboxModule");
			},
			onMessageSubscribe: function(args){
				console.log("StTrasportPage received message");
				return "result";
			},
			
			generateName: function(){
				var number = this.get("StNumber");
				var brand = this.get("StCarBrand");
				var model = this.get("StCarModel");
				var maxWeight = this.get("StMaxWeight");
				
				
				if(brand && model && maxWeight){
					var result = number + " - " + brand.displayValue + " " + model.displayValue + " (" + maxWeight + ")";
					
					this.set("StName", result);
				} else {
					this.set("StName", number);
				}
			},
			
			mileageValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StMileage") < 0){
					invalidMessage = this.get("Resources.Strings.MileageGreaterThanZero");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			maxWeightValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StMaxWeight") <= 0){
					invalidMessage = this.get("Resources.Strings.MaxWeightGreaterThanZero");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			setValidationConfig: function(){
				this.callParent(arguments);
				this.addColumnValidator("StMileage", this.mileageValidator);
				this.addColumnValidator("StMaxWeight", this.maxWeightValidator);
			},
			
			onChangeFieldsButtonClick: function(){
				this.set("StContactCollection", new Terrasoft.Collection());
				this.set("StContactEdit", null);
				this.set("StDateEdit", null);
				this.set("StTimeEdit", null);
				this.set("StNumberEdit", 0);
				this.set("StStringEdit", "");
				var inputBoxControls = this.getInputBoxControls();
				
				Terrasoft.utils.inputBox(
					"Test input box",
					this.openInputBoxHandler,
					[Terrasoft.MessageBoxButtons.OK, Terrasoft.MessageBoxButtons.CANCEL], 
					this, 
					inputBoxControls
				);
				Terrasoft.each(Terrasoft.MessageBox.controlArray, function(item) {
					item.control.bind(this);
				}, this);
				
			},
			getInputBoxControls: function(){
				return {
					"StContact": {
						dataValueType: Terrasoft.DataValueType.ENUM,
						isRequired: true,
						caption: "Contact",
						value: {
							bindTo: "StContactEdit"
						},
						customConfig: {
							tag: "Contact",
							list: {
								bindTo: "StContactCollection"
							},
							prepareList: {
								bindTo: "getCollectionValues"
							},
							loadNextPage: {
								bindTo: "loadCollectionNextPage"
							}
						}
					},
					"StNumber": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						isRequired: true,
						caption: "Number",
						value: {
							bindTo: "StNumberEdit"
						},
						customConfig: {
							className: "Terrasoft.MemoEdit",
						}
					},	
					"StString": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						isRequired: true,
						caption: "String",
						value: {
							bindTo: "StStringEdit"
						},
						customConfig: {
							className: "Terrasoft.FloatEdit",
						}
					},
					"StDate": { 
						dataValueType: Terrasoft.DataValueType.DATE_TIME,
						caption: "Datetime",
						customConfig: { 
							className: "Terrasoft.Container",
							items: [ 
								{ 
									className: "Terrasoft.DateEdit",
									id :  "dateEdit",
									value: {
										bindTo: "StDateEdit"
									},
									width: "50%" 
								},
								{ 
									className:  "Terrasoft.TimeEdit",
									id:  "timeEdit",
									value: {
										bindTo: "StTimeEdit"
									},
									width:  "50%" 
								} 
							]
						} 
					 }
				};
			},
			openInputBoxHandler: function(){
				if (pressedButtonCode === Terrasoft.MessageBoxButtons.OK.returnCode) {
					if (controlData.StContact.value && controlData.StContact.value.value) {
						var dateTime = this.getDateTimeByDateAndTimeFromInputBox();
						var contact = controlData.StContact.value.value;
						var float = controlData.StNumber.value; 
						var string = controlData.StString.value;
					} else {
						var message = "Something is wrong. Try again.";
						this.showInformationDialog(message, function(){
							this.openInputBox();
						});
					}
				}
			},
			getDateTimeByDateAndTimeFromInputBox: function(){
				if(!this.get("StDateEdit")) {
					return "";
				}
				var date = this.get("StDateEdit");
				var time = this.get("StTimeEdit");
				date.setHours(time.getHours()); 
				date.setMinutes(time.getMinutes()); 
				return date;
			},
			
			getCollectionValues: function(filter, list, tag) {
				if (Ext.isEmpty(list)) {
					return;
				}
				list.clear();
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: tag,
					isPageable: true,
					rowCount: 20
				});
				this.buildCollectionQuery(esq, list, filter, tag);
			},
			loadCollectionNextPage: function(listParams, tag) {
				if (!this.get("CanLoadMore" + tag)) {
					return;
				}
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: tag,
					isPageable: true,
					rowCount: 20,
					rowsOffset: listParams.listView.collectionItemsCount
				});
				this.buildCollectionQuery(esq, listParams.list, listParams.filterValue, tag);
			},
			buildCollectionQuery: function(esq, list, filter, tag) {
				if (tag === "Contact"){
					esq.filters.addItem(Terrasoft.createExistsFilter("[Employee:Contact:Id].Id"));
				}
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				var orderColumn = esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
				orderColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				esq.filters.addItem(esq.createPrimaryDisplayColumnFilterWithParameter(
					Terrasoft.ComparisonType.START_WITH, filter, Terrasoft.DataValueType.TEXT));
				esq.getEntityCollection(function(response) {
					if (response && response.success) {
						var preObject = {};
						response.collection.each(function(item) {
							preObject[item.get("value")] = item.values;
						}, this);
						list.loadAll(preObject);
						this.set("CanLoadMore" + tag, response.collection.getCount() === 20);
					}
				}, this);
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
                "operation": "insert",
                "parentName": "LeftModulesContainer",
                "propertyName": "items",
                "name": "ContactProfile",
                "values": {
                    "itemType": Terrasoft.ViewItemType.MODULE
                }
            },
			{
                "operation": "insert",
                "parentName": "LeftContainer",
                "propertyName": "items",
                "name": "ChangeFieldsButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": {bindTo: "Resources.Strings.ChangeFieldsButtonCaption"},
                    "click": {bindTo: "onChangeFieldsButtonClick"},
                    "enabled": {bindTo: "isChangeFieldButtonEnabled"},
					"classes": {
						"textClass": "custom-button-style"
					}
                }
            },
			{
				"operation": "insert",
				"name": "StName",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StName",
					"classes": {
						"wrapClassName": [
							"custom-field-style"
						]
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StCarBrand",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StCarBrand"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StCarModel",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StCarModel"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "StMainDriver",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StMainDriver"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "StMaxWeight",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "StMaxWeight"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StMileage",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "StMileage"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StNumber",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "StNumber"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "StOwner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "StOwner"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "DFCalculationIndicator1e68c84a-1e82-48e0-b30a-836bb85bc514",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 7,
						"column": 0,
						"row": 2,
						"layoutName": "Header",
						"useFixedColumnHeight": true
					},
					"itemType": 4,
					"classes": {
						"wrapClassName": [
							"card-widget-grid-layout-item"
						]
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "StNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StVoyageDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/
	};
});
