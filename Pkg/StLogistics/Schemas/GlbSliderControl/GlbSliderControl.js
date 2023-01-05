define("GlbSliderControl", ["ext-base", "GlbjQueryUI", "css!GlbCSSjQueryUI", "css!GlbCSSjQueryUITheme",
	"css!GlbCSSjQueryUIStructure", "css!GlbSliderControl"],
function(Ext) {
	Ext.define("Terrasoft.controls.GlbSliderControl", {
		extend: "Terrasoft.Component",
		alternateClassName: "Terrasoft.GlbSliderControl",
		
		tpl: [
			/*jshint quotmark:true */
			'<div id="{id}-wrap" class="{wrapClass}"><div id="{id}"></div></div>'
			/*jshint quotmark:false */
		],
	
		id: null,
		wrapClass: ["glb-slider-control"],
		
		min: 0,
		max: 100,
		value: 50,
		step: 1,
		
		getValue: function() {
			return this.value;
		},
		
		setValue: function(value) {
			var isChanged = this.changeValue(value);
			if (this.rendered && isChanged) {
				$("#" + this.id).slider("value", value);
			}
			return isChanged;
			
		},
		
		setMin: function(value) {
			this.min = value;
			this.glbRenderSlider();
		},
		
		setMax: function(value) {
			this.max = value;
			this.glbRenderSlider();
		},
		
		setStep: function(value) {
			this.step = value;
			this.glbRenderSlider();
		},
		
		init: function() {
			this.callParent(arguments);
			var selectors = this.selectors = this.selectors || {};
			selectors.wrapEl = selectors.wrapEl || "#" + this.id;
			
			this.addEvents(
				"change"
			);
		},
		
		onAfterRender: function() {
			this.callParent(arguments);
			this.glbRenderSlider();
		},
	
		onAfterReRender: function() {
			this.callParent(arguments);
			this.glbRenderSlider();
		},
		
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			return Ext.apply(bindConfig, {
				value: {
					changeEvent: "change",
					changeMethod: "setValue"
				},
				min: {
					changeMethod: "setMin"
				},
				max: {
					changeMethod: "setMax"
				},
				step: {
					changeMethod: "setStep"
				}
			});
		},
		
		getTplData: function() {
			var tplData = this.callParent(arguments);
			return Ext.apply(tplData, {
				wrapClass: this.wrapClass,
				value: this.value
			});
		},
		
		glbRenderSlider: function() {
			$("#" + this.id).slider({
				min: this.min,
				max: this.max,
				value: this.value,
				step: this.step,
				slide: function(event, ui) {
					this.setValue(ui.value);
				}.bind(this),
				change: function( event, ui ) {
					this.setValue(ui.value);
				}.bind(this)
			});
		},
		
		changeValue: function(value) {
			var isChanged = (value !== this.getValue());
			if (isChanged) {
				this.value = value;
				this.fireEvent("change", value, this);
			}
			return isChanged;
		}
		
	});
	return Terrasoft.GlbSliderControl;
});