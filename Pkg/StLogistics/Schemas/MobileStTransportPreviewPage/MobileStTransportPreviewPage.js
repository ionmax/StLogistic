 Terrasoft.LastLoadedPageData = {
   controllerName: "StTransportPreviewPage.Controller",
   viewXType: "stTransportpreviewpageview"
};
Ext.define("StTransportPreviewPage.View", {
   extend: "Terrasoft.view.BasePreviewPage",
   xtype: "stTransportpreviewpageview",
   config: {
      id: "StTransportPreviewPage"
   }
});
Ext.define("StTransportPreviewPage.Controller", {
   extend: "FileAndLinksPreviewPage.Controller",
   statics: {
      Model: StTransport
   },
   config: {
      refs: {
         view: "#StTransportPreviewPage"
      }
   },
   fileModel: "StTransportFile"
});