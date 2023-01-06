define("StTransportSection", [], function() {
	return {
		entitySchemaName: "StTransport",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
                "operation": "insert",
                "parentName": "ActionButtonsContainer",
                "propertyName": "items",
                "name": "CORSTestButton",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "caption": "CORS",
                    "click": { bindTo: "onCORSTestButtonClick" },
                    "layout": {
                        "column": 1,
                        "row": 6,
                        "colSpan": 1
                    }
                }
            }
		]/**SCHEMA_DIFF*/,
		methods: {
			onCORSTestButtonClick: function() {
				var xhr = this.createCORSRequest("GET", "https://api.github.com");

				xhr.onload = function() {
				  alert( this.responseText );
				}

				xhr.onerror = function() {
				  alert( 'Error ' + this.status );
				}

				xhr.send();
			},
			  createCORSRequest: function(method, url) {
				  var xhr = new XMLHttpRequest();
				  if ("withCredentials" in xhr) {
					// Most browsers.
					xhr.open(method, url, true);
				  } else if (typeof XDomainRequest != "undefined") {
					// IE8 & IE9
					xhr = new XDomainRequest();
					xhr.open(method, url);
				  } else {
					// CORS not supported.
					xhr = null;
				  }
				  return xhr;
			}
		}
	};
});
