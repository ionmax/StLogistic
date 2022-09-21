{
	"SyncOptions": {
		"SysSettingsImportConfig": [],
		"ModelDataImportConfig": [
			{
				"Name": "StTransport",
				"SyncColumns": [
					"StName",
					"StOwner",
					"StCarModel",
					"StCarBrand",
					"StNumber"
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
        "StMyAction"
    ],
	"Models": {
		"StTransport": {
			"RequiredModels": [
				"StTransport",
				"Contact",
				"StCarModel",
				"StCarBrand",
				"SocialMessage",
				"StVoyage"
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