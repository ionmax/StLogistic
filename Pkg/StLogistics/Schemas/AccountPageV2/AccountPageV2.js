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
				"name": "SliderGroup",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.SliderGroupGroupCaption"
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "SliderGroupLayout",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "SliderGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "SliderGroupLayout",
				"propertyName": "items",
				"name": "DevSliderControl_decimal",
				"index": 3,
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"generator": "GlbSliderControlGenerator.generateSlider",
					"controlConfig": {
						"min": { "bindTo": "GlbMinDec" },
						"max": { "bindTo": "GlbMaxDec" },
						"step": { "bindTo": "DecimalStep" },
						"value": { "bindTo": "GlbFloat" }
					}
				}
			}

        ]/**SCHEMA_DIFF*/,
        methods: {
            getSource: function() {
                return this.get("Web");
            }
        }
    };
});