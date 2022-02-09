define("StTestWebsocketMessageMixin", [], 
	function(){
		Ext.define("Terrasoft.configuration.mixins.StTestWebsocketMessageMixin", {
				alternateClassName: "Terrasoft.StTestWebsocketMessageMixin",
				
				SubscribeOnShowInformationWindowTest: function(){
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.ShowInformationWindowTestHandler, this);
				},
			
				UnSubscribeOnShowInformationWindowTest: function(){
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.ShowInformationWindowTestHandler, this);
				},
			
				ShowInformationWindowTestHandler: function(scope, message){
					if(!message){
						return;
					}
					
					if(message.Header && message.Header.Sender !== "ShowInformationWindowTest"){
						return;
					}
					
					var obj = JSON.parse(message.Body);
					
					Terrasoft.showInformation("String: " + obj.testString + " Guid: " + obj.testGuid +
											 " Date: " + obj.testDate + " Number: " + obj.testNumber);
				}
			}
		);	
	}
);