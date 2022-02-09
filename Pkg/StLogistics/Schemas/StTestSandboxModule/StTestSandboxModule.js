 define("StTestSandboxModule", [], function(){
	 Ext.define("Terrasoft.configuration.StTestSandboxModule", {
		 alternateClassName: "Terrasoft.StTestSandboxModule",
		 extend: "Terrasoft.BaseModule",
		 Ext: null,
		 sandbox: null,
		 Terrasoft: null,
		 messages: {
			 "PTPMessageToSubscribe": {
				 mode: Terrasoft.MessageMode.PTP,
				 direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			 },
			 "BROADCASTMessageToPublish": {
				 mode: Terrasoft.MessageMode.BROADCAST,
				 direction: Terrasoft.MessageDirectionType.PUBLISH
			 }
		 },
		 
		 init: function(){
			 this.callParent(arguments);
			 this.sandbox.registerMessages(this.messages);
			 this.publishMessage({oldArg: "old"});
		 },
		 
		 destroy: function(){
			 if(this.messages){
				 var messages = this.Terrasoft.keys(this.messages);
				 this.sandbox.unRegisterMessages(messages);
			 }
			 this.callParent(arguments);
		 },
		 
		 publishMessage: function(args){
			 var result = this.sandbox.publish("BROADCASTMessageToPublish", args, ["resultTag"]);
			 console.log(this.sandbox.id + result);
		 },
		 
		 subscribeMessage: function(){
			 this.sandbox.subscribe("PTPMessageToSubscribe", this.onMessageReceived, this, ["resultTag"]);
		 },
		 
		 onMessageReceived: function(args){
			 console.log("onMessageReceived method");
			 args = {
				 newArg: "new"
			 };
			 return args;
		 }
	 });
	 return Terrasoft.StTestSandboxModule;
 });