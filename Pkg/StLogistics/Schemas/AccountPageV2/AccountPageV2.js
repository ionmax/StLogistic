 define("AccountPageV2", ["StIFrameControl", "GlbSliderControl", "GlbSliderControlGenerator", "css!StIFrameControl"], function() {
    return {
        entitySchemaName: "Account",
		attributes: {
			"GlbMinDec": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": 1
			},
			"GlbMaxDec": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": 100
			},
			"DecimalStep": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": 1
			},
			"GlbFloat": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": 50
			},
		},
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "WebTab",
                "values": {
                    "caption": "WEB",
                    "items": []
                },
                "parentName": "Tabs",
                "propertyName": "tabs",
                "index": 1
            },
            {
                "operation": "insert",
                "name": "StIFrame",
                "parentName": "WebTab",
                "propertyName": "items",
                "values": {
                    "generator": function(){
						return {
							"className": "Terrasoft.StIFrameControl",
							"src": {"bindTo": "getSource"}
						};
					}
                }
            },
			{
				"operation": "insert",
				"name": "CodeSlider",
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"layoutName": "AccountPageGeneralInfoBlock"
					},
					"generator": "GlbSliderControlGenerator.generateSlider",
					"controlConfig": {
						"min": { "bindTo": "GlbMinDec" },
						"max": { "bindTo": "GlbMaxDec" },
						"step": { "bindTo": "DecimalStep" },
						"value": { "bindTo": "GlbFloat" }
					}
				}
			},
        ]/**SCHEMA_DIFF*/,
        methods: {
            getSource: function() {
                return this.get("Web");
            }
        }
    };
});