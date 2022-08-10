 define("StHierarchyVoyageDetail", [], function() {
	return {
		entitySchemaName: "StVoyage",
		attributes: {
		},
		methods: {
			addChildRecord: function () {
			   this.set("IsChildRecord", true);
			   this.sandbox.publish("SaveRecord", {
				  isSilent: true,
				  messageTags: [this.sandbox.id]
			   }, [this.sandbox.id]);
			},
			onCardSaved: function () {
			   if (this.get("IsChildRecord")) {
				  this.openVoyageLookup();
			   } else {
				  this.callParent(arguments);
			   }
			},
			openVoyageLookup: function () {
				var transportId = this.get("MasterRecordId");

				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "StVoyage"
				});
				esq.addColumn("Id");
				esq.filters.add(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "StTransport", transportId));
				esq.getEntityCollection(function (result) {
					var existsCollection = [];
					if (result.success) {
						result.collection.each(function (item) {
							existsCollection.push(item.get("Id"));
						}, this);
					}
					var config = {
						entitySchemaName: "StVoyage",
						multiSelect: true
					};
					var filterGroup = Terrasoft.createFilterGroup();
					if (existsCollection.length > 0) {
						var existsFilter = Terrasoft.createColumnInFilterWithParameters("Id", existsCollection);
						existsFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
						filterGroup.add("existFilter", existsFilter);
					}
					config.filters = filterGroup;
					this.openLookup(config, this.addCallBack, this);
				}, this);
			},
			addCallBack: function (args) {
			   var bq = Ext.create("Terrasoft.BatchQuery");
			   this.selectedRows = args.selectedRows.getItems();
			   this.selectedRows.forEach(function (item) {
				  bq.add(this.getUpdateQuery(item));
			   }, this);
			   if (bq.queries.length) {
				  bq.execute(this.onItemUpdated, this);
			   }
			},
			getUpdateQuery: function (item) {
			   var activeRow = this.getActiveRow();
			   var transport = this.get("MasterRecordId");
			   var parentRecordId = activeRow.get("Id");

			   var update = Ext.create("Terrasoft.UpdateQuery", {
				  rootSchemaName: "StVoyage"
			   });

			   update.setParameterValue("StTransport", transport, Terrasoft.DataValueType.GUID);
			   update.setParameterValue("Parent", parentRecordId, Terrasoft.DataValueType.GUID);
				
			   update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Id", item.value));

			   return update;
			},
			onItemUpdated: function () {  
			   this.reloadGridData();
			},
			
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"hierarchical": true,
					"hierarchicalColumnName": "Parent"
				}
			},
			{
			   "operation": "insert",
			   "name": "AddRecordButtonV2",
			   "parentName": "Detail",
			   "propertyName": "tools",
			   "index": 0,
			   "values": {
				  "itemType": Terrasoft.ViewItemType.BUTTON,
				  "caption": {"bindTo": "Resources.Strings.AddButtonCaption"},
				  "controlConfig": {
					 "menu": {
						"items": [
						   {
							  "caption": {"bindTo": "Resources.Strings.AddParentCaption"},
							  "click": {"bindTo": "addRecord"}
						   },
						   {
							  "caption": {"bindTo": "Resources.Strings.AddChildCaption"},
							  "click": {"bindTo": "addChildRecord"}
						   }
						]
					 }
				  },
				  "visible": {"bindTo": "getAddRecordButtonVisible"},
				  "enabled": {"bindTo": "getAddRecordButtonEnabled"}
			   }
			}
			
		]/**SCHEMA_DIFF*/
	};
});