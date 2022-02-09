define("StConfigurationDetail", ["ConfigurationGrid", "ConfigurationGridGenerator",
    "ConfigurationGridUtilities"], function() {
    return {
        entitySchemaName: "StConfiguration",
        attributes: {
            "IsEditable": {
                dataValueType: Terrasoft.DataValueType.BOOLEAN,
                type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                value: true
            }
        },
        mixins: {
            ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
        },
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "merge",
                "name": "DataGrid",
                "values": {
                    "className": "Terrasoft.ConfigurationGrid",
                    "generator": "ConfigurationGridGenerator.generatePartial",
                    "generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
                    "changeRow": {"bindTo": "changeRow"},
                    "unSelectRow": {"bindTo": "unSelectRow"},
                    "onGridClick": {"bindTo": "onGridClick"},
                    "activeRowActions": [
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "save",
                            "markerValue": "save",
                            "imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
                        },
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "cancel",
                            "markerValue": "cancel",
                            "imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
                        },
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "remove",
                            "markerValue": "remove",
                            "imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
                        }
                    ],
                    "initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
                    "activeRowAction": {"bindTo": "onActiveRowAction"},
                    "multiSelect": {"bindTo": "MultiSelect"},
                    "UsrDescription": {
                        "contentType": Terrasoft.ContentType.LONG_TEXT
                    }
                }
            }
        ]/**SCHEMA_DIFF*/
    };
});