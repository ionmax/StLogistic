define("StVoyageSection", [], function() {
	return {
		entitySchemaName: "StVoyage",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"hierarchical": true,
					"hierarchicalColumnName": "Parent",
					"updateExpandHierarchyLevels": {
						"bindTo": "onExpandHierarchyLevels"
					},
					"expandHierarchyLevels": {
						"bindTo": "expandHierarchyLevels"
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onDeleted: function(result) {
				this.callParent(arguments);
				if (result.Success) {
					this.clearExpandHierarchyLevels();
				}
			},
			changeSorting: function() {
				this.clearExpandHierarchyLevels();
				this.callParent(arguments);
			},
			clearExpandHierarchyLevels: function() {
				var grid = this.getCurrentGrid();
				if (grid) {
					Terrasoft.each(this.get("expandHierarchyLevels"), function(id) {
						grid.toggleHierarchyFolding(id);
					}, this);
					grid.expandHierarchyLevels = [];
				}
			},
			putParentColumn: function (esq) {
				if (!esq.columns.contains("Parent")) {
					var parentColumn = esq.addColumn("Parent");
					parentColumn.orderDirection = Terrasoft.OrderDirection.ASC;
					parentColumn.orderPosition = 0;
				}
				if (!esq.columns.contains("ChildsCount")) {
					this.addChildsCountColumn(esq);
				}
			},
			addChildsCountColumn: function(esq) {
				var expressionConfig = {
					columnPath: "[StVoyage:Parent].Id",
					parentCollection: this,
					aggregationType: Terrasoft.AggregationType.COUNT
				};
				var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
				var esqColumn = esq.addColumn("ChildsCount");
				esqColumn.expression = column;
				esqColumn.orderDirection = Terrasoft.OrderDirection.DESC;
				esqColumn.orderPosition = 0;
			},
			initQueryFilters: function(esq) {
				this.callParent(arguments);
				if (this.isEmptyFilters(esq.filters.getItems())) {
					esq.filters.add("RootElementsFilter", Terrasoft.createColumnIsNullFilter("Parent"));
				}
			},
			isEmptyFilters: function(items) {
				var result = true;
				Terrasoft.each(items, function(item) {
					if (!item.collection &&
						item.filterType !== Terrasoft.FilterType.FILTER_GROUP && item.leftExpression) {

						result = false;
					} else {
						result = result && this.isEmptyFilters(item.getItems());
					}
				}, this);
				return result;
			},
			addGridDataColumns: function (esq) {
				this.callParent(arguments);
				this.putParentColumn(esq);
			},
			onGridLoaded: function() {
				this.callParent(arguments);
				var grid = this.getCurrentGrid();
				if (grid) {
					grid.voyageScope = this;
					if (!grid.baseGetRow) {
						grid.baseGetRow = grid.getRow;
					}
					grid.getRow = this.getRow;
					if (!grid.baseExpandHierarchy) {
						grid.baseExpandHierarchy = grid.expandHierarchy;
					}
					grid.expandHierarchy = this.expandHierarchy;
				}
			},
			getRow: function(item) {
				var row = this.baseGetRow(item);
				var parents = Ext.Array.filter(this.rows, function(itemRow) {
					return itemRow.Id === row[this.hierarchicalColumnName];
				}, this);
				if (!parents.length) {
					delete row[this.hierarchicalColumnName];
				}
				row.HasNesting = (item.get("ChildsCount") > 0);
				return row;
			},
			onRender: function() {
				this.callParent(arguments);
				this.reloadGridData();
			},
			expandHierarchy: function(toggle, children, rowId) {
				toggle.removeCls(this.hierarchicalPlusCss);
				toggle.addCls(this.hierarchicalMinusCss);
				if (Ext.isEmpty(children)) {
					return;
				}
				var grid = this.voyageScope.getCurrentGrid();
				var esq = this.voyageScope.getGridDataInitializedEsq();
				esq.rowCount = -1;
				esq.filters.removeByKey("RootElementsFilter");
				esq.filters.add("ParentFilter", esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Parent", rowId));
				esq.getEntityCollection(function(response) {
					if (response.success) {
						var collection = response.collection;
						Terrasoft.each(collection.getKeys(), function(key) {
							if (!grid.collection.contains(key)) {
								grid.collection.add(key, collection.get(key));
							}
						}, this);
						grid.clear();
						this.voyageScope.prepareResponseCollection(grid.collection);
						grid.prepareCollectionData();
						grid.safeRerender();
					}
				}, this);
			},
			clearLoadedRecords: function(dataCollection) {
				var filteredCollection = this.callParent(arguments);
				if (filteredCollection) {
					filteredCollection.each(function(item) {
						item.set("Parent", null);
					}, this);
				}
				
				return filteredCollection;
			}
		}
	};
});
