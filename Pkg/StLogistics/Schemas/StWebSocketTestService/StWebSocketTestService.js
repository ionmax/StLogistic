 Ext.define("Terrasoft.configuration.service.StWebSocketTestService", {
    alternateClassName: "Terrasoft.StWebSocketTestService",
    statics: {
         
        serviceUrl: "rest/StWebSocketTestService/",  // Name of your Service
         
        TestRunProcess: function(config) {
            var data = {
                message: config.message // Input parameter(s) of service
            };
            Terrasoft.RequestManager.issueRequest({
                supressRequestEvents: false,
                requestFn: Terrasoft.Ajax.request,
                requestFnConfig: {
                    url: Terrasoft.util.encodeServiceUrl(this.serviceUrl) + config.action,
                    method: "POST",
                    jsonData: data,
                    success: function(response) {
                        var decodedResponse = Ext.JSON.decode(response.responseText, true);
                        Ext.callback(config.success, config.scope, [decodedResponse]);
                    },
                    failure: function(response) {
                        var parser = Ext.create("Terrasoft.ServiceResponseParser", response);
                        var exception = parser.getServiceFailureException();
                        Ext.callback(config.failure, config.scope, [exception]);
                    },
                    scope: this
                },
                responseToStatusCodeFn: function(response) {
                    return response.status;
                },
                scope: Terrasoft.Ajax
            });
        }
    }
});