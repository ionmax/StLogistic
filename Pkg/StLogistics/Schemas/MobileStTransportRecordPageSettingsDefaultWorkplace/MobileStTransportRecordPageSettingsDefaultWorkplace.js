[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "StTransport",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"SocialMessageDetailCaptionStTransport_caption": "Feed",
				"primaryColumnSetStTransport_caption": "General information",
				"StVoyageDetailStandardDetailStTransport_caption": "Voyage in transport"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandardDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionStTransport_caption",
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
		"name": "StVoyageDetailStandardDetail",
		"values": {
			"caption": "StVoyageDetailStandardDetailStTransport_caption",
			"entitySchemaName": "StVoyage",
			"filter": {
				"detailColumn": "StTransport",
				"masterColumn": "Id"
			},
			"detailSchemaName": "StVoyageDetail",
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "StTransport",
			"caption": "primaryColumnSetStTransport_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "2185d42a-082a-4308-8388-474673c848aa",
		"values": {
			"row": 0,
			"content": "Name",
			"columnName": "StName",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "2eda492c-d338-47c4-a82c-93f32b0fe376",
		"values": {
			"row": 1,
			"content": "Owner",
			"columnName": "StOwner",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "2b9f8109-3d68-4a43-b234-cf11602325a9",
		"values": {
			"row": 2,
			"content": "Car model",
			"columnName": "StCarModel",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "865d2c88-2f7f-4c44-97cd-b773755a8b1c",
		"values": {
			"row": 3,
			"content": "Car brand",
			"columnName": "StCarBrand",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "57cd023c-f29a-43ad-9a11-bd9cf42906b0",
		"values": {
			"row": 4,
			"content": "Number",
			"columnName": "StNumber",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 4
	}
]