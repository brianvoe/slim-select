(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class config {
        constructor(info) {
            this.isMultiple = false;
            this.id = '';
            this.isAjax = false;
            this.isSearching = false;
            this.showSearch = true;
            this.searchHighlight = false;
            this.closeOnSelect = true;
            this.showContent = 'auto'; // options: auto, up, down
            this.searchPlaceholder = 'Search';
            this.searchText = 'No Results';
            this.placeholderText = 'Select Value';
            this.allowDeselect = false;
            this.isEnabled = true;
            this.valuesUseText = false;
            this.showOptionTooltips = false;
            // Classes
            this.main = 'ss-main';
            this.singleSelected = 'ss-single-selected';
            this.arrow = 'ss-arrow';
            this.multiSelected = 'ss-multi-selected';
            this.add = 'ss-add';
            this.plus = 'ss-plus';
            this.values = 'ss-values';
            this.value = 'ss-value';
            this.valueText = 'ss-value-text';
            this.valueDelete = 'ss-value-delete';
            this.content = 'ss-content';
            this.open = 'ss-open';
            this.openAbove = 'ss-open-above';
            this.openBelow = 'ss-open-below';
            this.search = 'ss-search';
            this.searchHighlighter = 'ss-search-highlight';
            this.addable = 'ss-addable';
            this.list = 'ss-list';
            this.optgroup = 'ss-optgroup';
            this.optgroupLabel = 'ss-optgroup-label';
            this.option = 'ss-option';
            this.highlighted = 'ss-highlighted';
            this.disabled = 'ss-disabled';
            this.hide = 'ss-hide';
            this.id = 'ss-' + Math.floor(Math.random() * 100000);
            this.style = info.select.style.cssText;
            this.class = info.select.classList;
            this.isMultiple = info.select.multiple;
            this.isAjax = info.isAjax;
            this.showSearch = (info.showSearch === false ? false : true);
            this.searchHighlight = (info.searchHighlight === true ? true : false);
            this.closeOnSelect = (info.closeOnSelect === false ? false : true);
            if (info.showContent) {
                this.showContent = info.showContent;
            }
            this.isEnabled = (info.isEnabled === false ? false : true);
            if (info.searchPlaceholder) {
                this.searchPlaceholder = info.searchPlaceholder;
            }
            if (info.searchText) {
                this.searchText = info.searchText;
            }
            if (info.placeholderText) {
                this.placeholderText = info.placeholderText;
            }
            this.allowDeselect = (info.allowDeselect === true ? true : false);
            if (info.valuesUseText) {
                this.valuesUseText = info.valuesUseText;
            }
            if (info.showOptionTooltips) {
                this.showOptionTooltips = info.showOptionTooltips;
            }
        }
    }
    exports.default = config;
});
