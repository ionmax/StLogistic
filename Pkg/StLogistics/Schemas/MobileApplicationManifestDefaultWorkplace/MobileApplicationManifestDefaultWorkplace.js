{
	"SyncOptions": {
		"SysSettingsImportConfig": [],
		"ModelDataImportConfig": [
			{
				"Name": "StTransport",
				"SyncFilter": {
					"property": "StMainDriver",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUserContact"
				},
				"SyncColumns": [
					"StName",
					"StOwner",
					"StCarModel",
					"StCarBrand",
					"StNumber",
					"StMainDriver"
				]
			},
			{
				"Name": "Contact",
				"SyncColumns": []
			},
			{
				"Name": "StCarModel",
				"SyncColumns": []
			},
			{
				"Name": "StCarBrand",
				"SyncColumns": []
			},
			{
				"Name": "SocialMessage",
				"SyncColumns": [
					"EntityId"
				]
			},
			{
				"Name": "StVoyage",
				"SyncColumns": [
					"StTransport",
					"StNumber"
				]
			},
			{
				"Name": "StTransportFile",
				"SyncColumns": [
					"StTransport",
					"Type",
					"Data",
					"Size"
				]
			}
		]
	},
	"Modules": {
		"StTransport": {
			"Group": "main",
			"Model": "StTransport",
			"Position": 10,
			"isStartPage": false,
			"Title": "StTransportSectionTitle",
			"Hidden": false
		}
	},
	"CustomSchemas": [
		"StWebSocketTestService",
        "StMyAction",
		"MobileFileAndLinksPreviewController",
		"MobileFileAndLinksPreviewControllerV2",
		"MobileFileAndLinksEditController",
		"MobileFileAndLinksEditControllerV2"
    ],
	"Models": {
		"StTransport": {
			"RequiredModels": [
				"StTransport",
				"Contact",
				"StCarModel",
				"StCarBrand",
				"SocialMessage",
				"StVoyage",
				"StTransportFile",
      			"FileType"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"MobileStTransportActionsSettingsDefaultWorkplace",
				"MobileStTransportGridPageSettingsDefaultWorkplace",
				"MobileStTransportRecordPageSettingsDefaultWorkplace",
				"StMobileTransportModuleConfig"
			]
		},
		"SocialMessage": {
			"RequiredModels": [],
			"ModelExtensions": [],
			"PagesExtensions": []
		},
		"StVoyage": {
			"RequiredModels": [
				"StVoyage",
				"SocialMessage"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"MobileStVoyageActionsSettingsDefaultWorkplace",
				"MobileStVoyageGridPageSettingsDefaultWorkplace",
				"MobileStVoyageRecordPageSettingsDefaultWorkplace"
			]
		}
	},
	"ModuleGroups": {
		"main": {}
	},
	"UseUTC": true
}