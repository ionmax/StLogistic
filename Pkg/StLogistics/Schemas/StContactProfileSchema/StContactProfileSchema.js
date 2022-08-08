define("StContactProfileSchema", ["ProfileSchemaMixin"], function () {
    return {
        entitySchemaName: "Contact",
        mixins: {
            ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin"
        },
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "StTransport",
                "parentName": "ProfileContentContainer",
                "propertyName": "items",
                "values": {
                    "bindTo": "StMainDriver",
                    "layout": {
                        "column": 3,
                        "row": 10,
                        "colSpan": 19
                    }
                }
            }
        ]/**SCHEMA_DIFF*/
    };
});