 define("AccountPageV2", ["StIFrameControl", "css!StIFrameControl"], function() {
    return {
        entitySchemaName: "Account",
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
            }
        ]/**SCHEMA_DIFF*/,
        methods: {
            getSource: function() {
                return this.get("Web");
            }
        }
    };
});