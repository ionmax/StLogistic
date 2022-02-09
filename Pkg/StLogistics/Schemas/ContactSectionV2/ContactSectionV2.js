 define("ContactSectionV2", ["ServiceHelper", "StTestWebsocketMessageMixin"], function(ServiceHelper) {
    return {
        entitySchemaName: "Contact",
        methods: {
			init: function(){
				this.callParent(arguments);
				this.SubscribeOnShowInformationWindowTest();
			},
			destroy: function(){
				this.UnSubscribeOnShowInformationWindowTest();
			},
            onWebsocketTestClick: function() {
				var testData = { "testData" :{
					testString: "string",
					testGuid: "65bb2306-7314-4605-a863-04a410798497",
					testDate: new Date(),
					testNumber: 5
				}};
				
                ServiceHelper.callService( "StWebSocketTestService", "ShowInformationWindow", 
					function(response){
						console.log(response);
				}, testData, this);
            }
        },
		mixins: {
			StTestWebsocketMessageMixin: "Terrasoft.StTestWebsocketMessageMixin"
		},
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "parentName": "SeparateModeActionButtonsLeftContainer",
                "propertyName": "items",
                "name": "TestWebsocketSectionButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "TestWebSocket",
                    "click": { bindTo: "onWebsocketTestClick" }
                }
            }
        ]/**SCHEMA_DIFF*/
    };
});