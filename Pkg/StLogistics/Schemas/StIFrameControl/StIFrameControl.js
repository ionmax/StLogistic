 Ext.define("Terrasoft.controls.StIFrameControl", {
    extend: "Terrasoft.Component",
    alternateClassName: "Terrasoft.StIFrameControl",
    tpl: [
        '<iframe id="{id}" src="{src}" class="{wrapClass}"></iframe>'
    ],
    id: null,
    src: null,
    wrapClass: ["usr-iframe"],

    setIframeSrc: function(value) {
        value = value || "";
        if (this.src !== value) {
            this.src = value;
            this.safeRerender();
        }
    },

    init: function() {
        this.callParent(arguments);
        var selectors = this.selectors = this.selectors || {};
        selectors.wrapEl = selectors.wrapEl || "#" + this.id;
    },

    LoadPageBySrc: function() {
        var iframe = this.getWrapEl();
        iframe.dom.src = this.src;
    },

    onAfterRender: function() {
        this.callParent(arguments);
        this.LoadPageBySrc();
    },

    onAfterReRender: function() {
        this.callParent(arguments);
        this.LoadPageBySrc();
    },

    getBindConfig: function() {
        var bindConfig = this.callParent(arguments);
        return Ext.apply(bindConfig, {
            src: {
                changeMethod: "setIframeSrc"
            }
        });
    },

    getTplData: function() {
        var tplData = this.callParent(arguments);
        return Ext.apply(tplData, {
            src: this.src,
            wrapClass: this.wrapClass
        });
    }
});
