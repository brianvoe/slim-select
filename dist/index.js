(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./config", "./data", "./helper", "./select", "./slim"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const config_1 = require("./config");
    const data_1 = require("./data");
    const helper_1 = require("./helper");
    const select_1 = require("./select");
    const slim_1 = require("./slim");
    class SlimSelect {
        constructor(info) {
            this.ajax = null;
            this.addable = null;
            this.beforeOnChange = null;
            this.onChange = null;
            this.beforeOpen = null;
            this.afterOpen = null;
            this.beforeClose = null;
            this.afterClose = null;
            this.validate(info);
            const selectElement = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
            // If select already has a slim select id on it lets destroy it first
            if (selectElement.dataset.ssid) {
                this.destroy(selectElement.dataset.ssid);
            }
            // Set ajax function if passed in
            if (info.ajax) {
                this.ajax = info.ajax;
            }
            // Add addable if option is passed in
            if (info.addable) {
                this.addable = info.addable;
            }
            this.config = new config_1.default({
                allowDeselect: info.allowDeselect,
                closeOnSelect: info.closeOnSelect,
                isAjax: (info.ajax ? true : false),
                isEnabled: info.isEnabled,
                placeholderText: info.placeholder,
                searchHighlight: info.searchHighlight,
                searchPlaceholder: info.searchPlaceholder,
                searchText: info.searchText,
                select: selectElement,
                showContent: info.showContent,
                showOptionTooltips: info.showOptionTooltips,
                showSearch: info.showSearch,
                valuesUseText: info.valuesUseText
            });
            this.select = new select_1.default({
                main: this,
                select: selectElement
            });
            this.data = new data_1.default({ main: this });
            this.slim = new slim_1.default({ main: this });
            // Add after original select element
            this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling);
            // If data is passed in lets set it
            // and thus will start the render
            if (info.data) {
                this.setData(info.data);
            }
            else {
                // Do an initial render on startup
                this.render();
            }
            // Add onclick listener to document to closeContent if clicked outside
            document.addEventListener('click', (e) => {
                if (!helper_1.hasClassInTree(e.target, this.config.id)) {
                    this.close();
                }
            });
            window.addEventListener('scroll', helper_1.debounce((e) => {
                if (this.data.contentOpen && this.config.showContent === 'auto') {
                    if (helper_1.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                        this.moveContentAbove();
                    }
                    else {
                        this.moveContentBelow();
                    }
                }
            }), false);
            // Add event callbacks after everthing has been created
            if (info.beforeOnChange) {
                this.beforeOnChange = info.beforeOnChange;
            }
            if (info.onChange) {
                this.onChange = info.onChange;
            }
            if (info.beforeOpen) {
                this.beforeOpen = info.beforeOpen;
            }
            if (info.afterOpen) {
                this.afterOpen = info.afterOpen;
            }
            if (info.beforeClose) {
                this.beforeClose = info.beforeClose;
            }
            if (info.afterClose) {
                this.afterClose = info.afterClose;
            }
        }
        validate(info) {
            const select = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
            if (!select) {
                throw new Error('Could not find select element');
            }
            if (select.tagName !== 'SELECT') {
                throw new Error('Element isnt of type select');
            }
        }
        selected() {
            if (this.config.isMultiple) {
                const selected = this.data.getSelected();
                const outputSelected = [];
                for (let i = 0; i < selected.length; i++) {
                    outputSelected.push(selected[i].value);
                }
                return outputSelected;
            }
            else {
                const selected = this.data.getSelected();
                return (selected ? selected.value : '');
            }
        }
        // Sets value of the select, adds it to data and original select
        set(value, type = 'value', close = true, render = true) {
            if (this.config.isMultiple && !Array.isArray(value)) {
                this.data.addToSelected(value, type);
            }
            else {
                this.data.setSelected(value, type);
            }
            this.select.setValue();
            this.data.onDataChange(); // Trigger on change callback
            this.render();
            if (close) {
                this.close();
            }
        }
        // setSelected is just mapped to the set method
        setSelected(value, type = 'value', close = true, render = true) {
            this.set(value, type, close, render);
        }
        setData(data) {
            // Validate data if passed in
            const isValid = data_1.validateData(data);
            if (!isValid) {
                console.error('Validation problem on: #' + this.select.element.id);
                return;
            } // If data passed in is not valid DO NOT parse, set and render
            const newData = JSON.parse(JSON.stringify(data));
            const selected = this.data.getSelected();
            // If its an ajax type keep selected values
            if (this.config.isAjax && selected) {
                if (this.config.isMultiple) {
                    const reverseSelected = selected.reverse();
                    for (let i = 0; i < reverseSelected.length; i++) {
                        newData.unshift(reverseSelected[i]);
                    }
                }
                else {
                    newData.unshift(this.data.getSelected());
                    newData.unshift({
                        placeholder: true,
                        text: ''
                    });
                }
            }
            this.select.create(newData);
            this.data.parseSelectData();
            this.data.setSelectedFromSelect();
        }
        // addData will append to the current data set
        addData(data) {
            // Validate data if passed in
            const isValid = data_1.validateData([data]);
            if (!isValid) {
                console.error('Validation problem on: #' + this.select.element.id);
                return;
            } // If data passed in is not valid DO NOT parse, set and render
            const opt = this.data.newOption(data);
            this.data.add(opt);
            this.select.create(this.data.data);
            this.data.parseSelectData();
            this.data.setSelectedFromSelect();
            this.render();
        }
        // Open content section
        open() {
            // Dont open if disabled
            if (!this.config.isEnabled) {
                return;
            }
            // Dont do anything if the content is already open
            if (this.data.contentOpen) {
                return;
            }
            // Focus on input field
            this.slim.search.input.focus();
            // Run beforeOpen callback
            if (this.beforeOpen) {
                this.beforeOpen();
            }
            if (this.config.isMultiple) {
                this.slim.multiSelected.plus.classList.add('ss-cross');
            }
            else {
                this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down');
                this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up');
            }
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove : this.config.openBelow));
            this.slim.content.classList.add(this.config.open);
            // Check showContent to see if they want to specifically show in a certain direction
            if (this.config.showContent.toLowerCase() === 'up') {
                this.moveContentAbove();
            }
            else if (this.config.showContent.toLowerCase() === 'down') {
                this.moveContentBelow();
            }
            else {
                // Auto identify where to put it
                if (helper_1.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                    this.moveContentAbove();
                }
                else {
                    this.moveContentBelow();
                }
            }
            // Move to selected option for single option
            if (!this.config.isMultiple) {
                const selected = this.data.getSelected();
                if (selected) {
                    const selectedId = selected.id;
                    const selectedOption = this.slim.list.querySelector('[data-id="' + selectedId + '"]');
                    if (selectedOption) {
                        helper_1.ensureElementInView(this.slim.list, selectedOption);
                    }
                }
            }
            // setTimeout is for animation completion
            setTimeout(() => {
                this.data.contentOpen = true;
                // Run afterOpen callback
                if (this.afterOpen) {
                    this.afterOpen();
                }
            }, 300);
        }
        // Close content section
        close() {
            // Dont do anything if the content is already closed
            if (!this.data.contentOpen) {
                return;
            }
            // Run beforeClose calback
            if (this.beforeClose) {
                this.beforeClose();
            }
            // this.slim.search.input.blur() // Removed due to safari quirk
            if (this.config.isMultiple) {
                this.slim.multiSelected.container.classList.remove(this.config.openAbove);
                this.slim.multiSelected.container.classList.remove(this.config.openBelow);
                this.slim.multiSelected.plus.classList.remove('ss-cross');
            }
            else {
                this.slim.singleSelected.container.classList.remove(this.config.openAbove);
                this.slim.singleSelected.container.classList.remove(this.config.openBelow);
                this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down');
                this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up');
            }
            this.slim.content.classList.remove(this.config.open);
            this.data.contentOpen = false;
            this.search(''); // Clear search
            // Reset the content below
            setTimeout(() => {
                this.slim.content.removeAttribute('style');
                this.data.contentPosition = 'below';
                this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openAbove);
                this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openBelow);
                // After content is closed lets blur on the input field
                this.slim.search.input.blur();
                // Run afterClose callback
                if (this.afterClose) {
                    this.afterClose();
                }
            }, 300);
        }
        moveContentAbove() {
            const selectHeight = (this.config.isMultiple ? this.slim.multiSelected.container.offsetHeight : this.slim.singleSelected.container.offsetHeight);
            const contentHeight = this.slim.content.offsetHeight;
            const height = selectHeight + contentHeight - 1;
            this.slim.content.style.margin = '-' + height + 'px 0 0 0';
            this.slim.content.style.height = (height - selectHeight + 1) + 'px';
            this.slim.content.style.transformOrigin = 'center bottom';
            this.data.contentPosition = 'above';
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openBelow);
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openAbove);
        }
        moveContentBelow() {
            this.slim.content.removeAttribute('style');
            this.data.contentPosition = 'below';
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openAbove);
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openBelow);
        }
        // Set to enabled, remove disabled classes and removed disabled from original select
        enable() {
            this.config.isEnabled = true;
            if (this.config.isMultiple) {
                this.slim.multiSelected.container.classList.remove(this.config.disabled);
            }
            else {
                this.slim.singleSelected.container.classList.remove(this.config.disabled);
            }
            // Disable original select but dont trigger observer
            this.select.disconnectMutationObserver();
            this.select.element.disabled = false;
            this.slim.search.input.disabled = false;
            this.select.observeMutationObserver();
        }
        // Set to disabled, add disabled classes and add disabled to original select
        disable() {
            this.config.isEnabled = false;
            if (this.config.isMultiple) {
                this.slim.multiSelected.container.classList.add(this.config.disabled);
            }
            else {
                this.slim.singleSelected.container.classList.add(this.config.disabled);
            }
            // Enable original select but dont trigger observer
            this.select.disconnectMutationObserver();
            this.select.element.disabled = true;
            this.slim.search.input.disabled = true;
            this.select.observeMutationObserver();
        }
        // Take in string value and search current options
        search(value) {
            // Only filter data and rerender if value has changed
            if (this.data.searchValue !== value) {
                this.slim.search.input.value = value;
                if (this.config.isAjax) {
                    if (value.trim() === '') {
                        this.setData([]);
                        this.data.search('');
                        this.render();
                    }
                    else {
                        const master = this;
                        this.config.isSearching = true;
                        this.render();
                        this.ajax(value, (info) => {
                            // Only process if return callback is not false
                            master.config.isSearching = false;
                            if (Array.isArray(info)) {
                                info.unshift({ text: '', placeholder: true });
                                master.setData(info);
                                master.data.search(value);
                                master.render();
                            }
                            else if (typeof info === 'string') {
                                master.slim.options(info);
                            }
                            else {
                                master.render();
                            }
                        });
                    }
                }
                else {
                    this.data.search(value);
                    this.render();
                }
            }
        }
        setSearchText(text) {
            this.config.searchText = text;
        }
        render() {
            if (this.config.isMultiple) {
                this.slim.values();
            }
            else {
                this.slim.placeholder();
                this.slim.deselect();
            }
            this.slim.options();
        }
        // Display original select again and remove slim
        destroy(id = null) {
            const slim = (id ? document.querySelector('.' + id) : this.slim.container);
            const select = (id ? document.querySelector(`[data-ssid=${id}]`) : this.select.element);
            // If there is no slim dont do anything
            if (!slim || !select) {
                return;
            }
            // Show original select
            select.style.display = null;
            delete select.dataset.ssid;
            // Remove slim from original select dropdown
            this.select.element.slim = null;
            // Remove slim select
            if (slim.parentElement) {
                slim.parentElement.removeChild(slim);
            }
        }
    }
    exports.SlimSelect = SlimSelect;
    exports.default = SlimSelect;
});
