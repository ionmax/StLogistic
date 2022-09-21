Terrasoft.LastLoadedPageData = {
   controllerName: "StTransportEditPage.Controller",
   viewXType: "stTransporteditpageview"
};
Ext.define("StTransportEditPage.View", {
   extend: "Terrasoft.view.BaseEditPage",
   xtype: "stTransporteditpageview",
   config: {
      id: "StTransportEditPage"
   }
});
Ext.define("StTransportEditPage.Controller", {
   extend: "FileAndLinksEditPage.Controller",
   statics: {
      Model: StTransport
   },
   config: {
      refs: {
         view: "#StTransportEditPage"
      }
   },
 
   fileModel: "StTransportFile"
}, function() {
   this.addDefaultBusinessRules();
}); 