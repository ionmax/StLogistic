Terrasoft.sdk.Actions.add("StTransport", {
    name: "myAction",
    actionClassName: "Terrasoft.MyAction"
}); 
Terrasoft.sdk.RecordPage.addEmbeddedDetail("StTransport", {
        name: "transportFilesDetail",
        position: 5,
        title: "StTransportRecordPage_StTransportFilesDetail_title",
        modelName: "StTransportFile",
        primaryKey: "Id",
        foreignKey: "StTransport",
        displaySeparator: false
    },
    [
        {
            name: "Data",
            displayColumn: "Name",
            label: "StTransportRecordPage_StTransportFilesDetail_Data"
        },
        {
            name: "Type",
            hidden: true
        },
        {
            name: "Name",
            label: "StTransportRecordPage_StTransportFilesDetail_Name",
            viewType: Terrasoft.ViewTypes.Url
        }
    ]
);