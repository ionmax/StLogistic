[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "StVoyage",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"SocialMessageDetailCaptionStVoyage_caption": "Feed",
				"primaryColumnSetStVoyage_caption": "General information"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandardDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionStVoyage_caption",
			"entitySchemaName": "SocialMessage",
			"showForVisibleModule": true,
			"filter": {
				"detailColumn": "EntityId",
				"masterColumn": "Id"
			},
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "StVoyage",
			"caption": "primaryColumnSetStVoyage_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "8930030e-d1d0-4ba5-aaf0-b071be5709f0",
		"values": {
			"row": 0,
			"content": "Number",
			"columnName": "StNumber",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	}
]