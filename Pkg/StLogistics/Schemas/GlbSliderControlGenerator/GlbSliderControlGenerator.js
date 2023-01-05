define("GlbSliderControlGenerator", ["ViewGeneratorV2", "GlbSliderControl"], function() {
	Ext.define("Terrasoft.configuration.GlbSliderControlGenerator", {
		alternateClassName: "Terrasoft.GlbSliderControlGenerator",
		extend: "Terrasoft.ViewGenerator",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		sliderName: "GlbSliderControl",
		sliderClassName: "Terrasoft.GlbSliderControl",
		
		serviceProperties: [
			"min",
			"max",
			"value",
			"step",
			"generator"
		],
		
		generateSlider: function(config) {
			var id = config.name || this.sliderName;
			var slider = {
				className: this.sliderClassName
			};
			this.applyControlId(slider, config, id);
			var serviceProperties = this.getConfigWithoutServiceProperties(config, this.serviceProperties);
			Ext.apply(slider, serviceProperties);
			this.applyControlConfig(slider, config);
			return slider;
		}
	});

	return Ext.create("Terrasoft.GlbSliderControlGenerator");
});
