 Ext.define("Terrasoft.MyAction", {
    extend: "Terrasoft.ActionBase",
    config: {
        useMask: false,
        title: "MyActionTitle",
        iconCls: Terrasoft.ActionIcons.Copy
    },
    execute: function(record) {
        this.callParent(arguments);
        Terrasoft.StWebSocketTestService.TestRunProcess({
			message: this.getRecord().getId() + " record message", 
			action: "TestRunProcess", 
			success: this.serviceSuccess, // Success callback
			failure: this.serviceFailure, // Error callback
			scope: this
		});
        this.executionEnd(true);
    },
	serviceSuccess: function(response) {
		if (response.isSuccess) {
			alert("Success");
		} else {
			Terrasoft.MessageBox.showMessage(Terrasoft.LocalizableStrings.StartErrorMessage); 
		}
	},
	serviceFailure: function(error) {
		var response = error.getResponse();
		Terrasoft.MessageBox.showMessage(response.statusText);
	}
});