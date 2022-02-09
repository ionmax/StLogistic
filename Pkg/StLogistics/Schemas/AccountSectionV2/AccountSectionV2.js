 define("AccountSectionV2", ["ServiceHelper", "ProcessModuleUtilities", "StTestWebsocketMessageMixin"], 
		function(ServiceHelper, ProcessModuleUtilities) {
    return {
        entitySchemaName: "Account",
        methods: {
			init: function(){
				this.callParent(arguments);
				
				var test1 = {a: '1', b: '2', d: { x: '4'}};
				var test2 = {b: '10', c: '3', d: { y: '5'}};

				////////////////////////////////////////////////////
				//Ext.apply(test1, test2);
				//Ext.applyIf(test1, test2);
				
				var test3 = Ext.merge({}, test1, test2);
				//var test3 = Ext.mergeIf({}, test1, test2);
				
				Ext.isEmpty(null);
				Ext.isEmpty(undefined);
				Ext.isEmpty([]);
				Ext.isEmpty('');
				Ext.isEmpty('', true);
				
				Ext.isFunction(this.destroy);
				Ext.isFunction(this.nonExistingFunc);
				Ext.isFunction(this.diff);
				///////////////////////////////////////////////////
				
				this.SubscribeOnShowInformationWindowTest();
			},
			destroy: function(){
				this.UnSubscribeOnShowInformationWindowTest();
			},
            onWebsocketTestClick: function() {
				var testData = {
					testString: "string",
					testGuid: "65bb2306-7314-4605-a863-04a410798497",
					testDate: new Date(),
					testNumber: "5"
				};
				
                ServiceHelper.callService( "StWebSocketTestService", "ShowInformationWindow", 
					function(response){
						console.log(response.ShowInformationWindowResult);
				}, {testData: testData}, this);
            },
			onRunProcessClick: function(){
				/*var args = {
					sysProcessName: "StTestRunProcessProcess",
					parameters: {
						Message: "Test message from front-end"
					}
				};
				ProcessModuleUtilities.executeProcess(args);*/
				
				ServiceHelper.callService( "StWebSocketTestService", "TestRunProcess", 
					function(response){
						console.log(response);
				}, null, this);
			}
        },
		mixins: {
			StTestWebsocketMessageMixin: "Terrasoft.StTestWebsocketMessageMixin"
		},
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "parentName": "SeparateModeActionButtonsContainer",
                "propertyName": "items",
                "name": "TestWebsocketSectionButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "TestWebSocket",
                    "click": { bindTo: "onWebsocketTestClick" }
                }
            },
			{
                "operation": "insert",
                "parentName": "SeparateModeActionButtonsContainer",
                "propertyName": "items",
                "name": "TestRunProcessButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "Run process",
                    "click": { bindTo: "onRunProcessClick" }
                }
            }
        ]/**SCHEMA_DIFF*/
    };
});