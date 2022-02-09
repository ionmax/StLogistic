define("StVoyagePage", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "StVoyage",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{
			"DFCalculationIndicator4f0d6802-2f30-49e9-add0-545e1a6bedf9": {
				"moduleId": "DFCalculationIndicator4f0d6802-2f30-49e9-add0-545e1a6bedf9",
				"moduleName": "CardWidgetModule",
				"config": {
					"parameters": {
						"viewModelConfig": {
							"widgetKey": "DFCalculationIndicator4f0d6802-2f30-49e9-add0-545e1a6bedf9",
							"recordId": "7d886567-eca3-41fa-afaa-7a8db4bf1d10",
							"primaryColumnValue": {
								"getValueMethod": "getPrimaryColumnValue"
							}
						}
					}
				}
			}
		}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "StVoyageFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "StVoyage"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"StTransport": {
				"adddda47-d593-42d7-ab88-1fab91e7dd60": {
					"uId": "adddda47-d593-42d7-ab88-1fab91e7dd60",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "StMaxWeight",
					"comparisonType": 7,
					"autoClean": true,
					"autocomplete": false,
					"type": 1,
					"attribute": "StWeight"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			onEntityInitialized: function(){
				this.callParent(arguments);
				
				if(this.isAddMode() || this.isCopyMode()){
					this.getIncrementCode(function(response){
						this.set("StNumber", response);
					});
				}
				
				this.on("change:StDriver", function(){
					var number = this.get("StNumber");
					var driver = this.get("StDriver");
					var startDate = this.get("StStartDate");
					var dueDate = this.get("StDueDate");
					
					var dto = {
						voyageNumber: number,
						driverId: driver.Id,
						startDate: startDate,
						dueDate: dueDate
					};
					
					ServiceHelper.callService("StLogisticDriverService", "CheckIsDriverBusy", function(response){
						var result = response.CheckIsDriverBusyResult;
						if(result != null){
							Terrasoft.showInformation(result);
						}
						
					}, dto, this);
				}, this);
			},
			
			weightValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StWeight") < 0){
					invalidMessage = this.get("Resources.Strings.WeightGreaterThanZero");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			distanceValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StDistance") <= 0){
					invalidMessage = this.get("Resources.Strings.DistanceGreaterThanZero");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			dueDateValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StDueDate") < this.get("StStartDate")){
					invalidMessage = this.get("Resources.Strings.DueDateGreaterThanStartDate");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			fuelValidator: function(){
				var invalidMessage = "";
				
				if(this.get("StFuelAmount") <= 0){
					invalidMessage = this.get("Resources.Strings.FuelAmountGreaterThanZero");
				}
				
				return {
					invalidMessage: invalidMessage
				};
			},
			
			setValidationConfig: function() {
                this.callParent(arguments);

                this.addColumnValidator("StWeight", this.weightValidator);
				this.addColumnValidator("StDistance", this.distanceValidator);
				this.addColumnValidator("StDueDate", this.dueDateValidator);
                this.addColumnValidator("StStartDate", this.dueDateValidator);
				this.addColumnValidator("StFuelAmount", this.fuelValidator);
            }
			
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "StNumber",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StNumber",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StDriver",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StDriver"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StTransport",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StTransport"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "StStartDate",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StStartDate"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "StDueDate",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "StDueDate"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "StFuelAmount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "StFuelAmount"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StDistance",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "StDistance"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StWeight",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "StWeight"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "DFCalculationIndicator4f0d6802-2f30-49e9-add0-545e1a6bedf9",
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
				"index": 3
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
			}
		]/**SCHEMA_DIFF*/
	};
});
