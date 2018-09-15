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
    // Class is responsible for managing the data
    class data {
        constructor(info) {
            this.contentOpen = false;
            this.contentPosition = 'below';
            this.isOnChangeEnabled = true;
            this.main = info.main;
            this.searchValue = '';
            this.data = [];
            this.filtered = null;
            this.parseSelectData();
            this.setSelectedFromSelect();
        }
        // Take in a value loop through the data till you find it and return it
        getObjectFromData(value, type = 'id') {
            for (let i = 0; i < this.data.length; i++) {
                // If option check if value is the same
                if (type in this.data[i] && String(this.data[i][type]) === String(value)) {
                    return this.data[i];
                }
                // If optgroup loop through options
                if (this.data[i].hasOwnProperty('options')) {
                    const optgroupObject = this.data[i];
                    for (let ii = 0; ii < optgroupObject.options.length; ii++) {
                        if (String(optgroupObject.options[ii][type]) === String(value)) {
                            return optgroupObject.options[ii];
                        }
                    }
                }
            }
            return null;
        }
        // From data get option | option[] of selected values
        // If single select return last selected value
        getSelected() {
            let value = null;
            const values = [];
            for (let i = 0; i < this.data.length; i++) {
                // Deal with optgroups
                if (this.data[i].hasOwnProperty('label')) {
                    if (this.data[i].hasOwnProperty('options')) {
                        const options = this.data[i].options;
                        for (let o = 0; o < options.length; o++) {
                            if (options[o].selected) {
                                // If single return option
                                if (!this.main.config.isMultiple) {
                                    value = options[o];
                                }
                                else {
                                    // Push to multiple array
                                    values.push(options[o]);
                                }
                            }
                        }
                    }
                }
                else {
                    // Push options to array
                    if (this.data[i].selected) {
                        // If single return option
                        if (!this.main.config.isMultiple) {
                            value = this.data[i];
                        }
                        else {
                            // Push to multiple array
                            values.push(this.data[i]);
                        }
                    }
                }
            }
            // Either return array or object or null
            if (this.main.config.isMultiple) {
                return values;
            }
            return value;
        }
        // Remove object from selected
        removeFromSelected(value, type = 'id') {
            if (this.main.config.isMultiple) {
                const values = [];
                const selected = this.getSelected();
                for (let i = 0; i < selected.length; i++) {
                    if (String(selected[i][type]) !== String(value)) {
                        values.push(selected[i][type]);
                    }
                }
                this.setSelected(values, type);
            }
        }
        // Trigger onChange callback
        onDataChange() {
            if (this.main.onChange && this.isOnChangeEnabled) {
                this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
            }
        }
        newOption(info) {
            return {
                data: (info.data ? info.data : {}),
                disabled: (info.disabled ? info.disabled : false),
                display: (info.display ? info.display : true),
                id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
                innerHTML: (info.innerHTML ? info.innerHTML : ''),
                placeholder: (info.placeholder ? info.placeholder : ''),
                selected: (info.selected ? info.selected : false),
                text: (info.text ? info.text : ''),
                value: (info.value ? info.value : '')
            };
        }
        // If select type is multiple append value and set selected
        addToSelected(value, type = 'id') {
            if (this.main.config.isMultiple) {
                const values = [];
                const selected = this.getSelected();
                for (let i = 0; i < selected.length; i++) {
                    values.push(selected[i][type]);
                }
                values.push(value);
                this.setSelected(values, type);
            }
        }
        // From value set the selected value
        setSelected(value, type = 'id') {
            // Loop through data and set selected values
            for (let i = 0; i < this.data.length; i++) {
                // Deal with optgroups
                if (this.data[i].hasOwnProperty('label')) {
                    if (this.data[i].hasOwnProperty('options')) {
                        const options = this.data[i].options;
                        for (let o = 0; o < options.length; o++) {
                            options[o].selected = this.shouldBeSelected(options[o], value, type);
                        }
                    }
                }
                else {
                    this.data[i].selected = this.shouldBeSelected(this.data[i], value, type);
                }
            }
        }
        // From passed in select element pull optgroup and options into data
        parseSelectData() {
            this.data = [];
            // Loop through nodes and create data
            const element = this.main.select.element;
            const nodes = element.childNodes;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeName === 'OPTGROUP') {
                    const node = nodes[i];
                    const optgp = {
                        label: node.label,
                        options: []
                    };
                    const options = nodes[i].childNodes;
                    for (let ii = 0; ii < options.length; ii++) {
                        if (options[ii].nodeName === 'OPTION') {
                            optgp.options.push(this.pullOptionData(options[ii]));
                        }
                    }
                    this.data.push(optgp);
                }
                else if (nodes[i].nodeName === 'OPTION') {
                    this.data.push(this.pullOptionData(nodes[i]));
                }
            }
        }
        // From select element get current selected and set selected
        setSelectedFromSelect() {
            const options = this.main.select.element.options;
            if (this.main.config.isMultiple) {
                const newSelected = [];
                for (let i = 0; i < options.length; i++) {
                    const opt = options[i];
                    if (opt.selected) {
                        newSelected.push(this.getObjectFromData(opt.value, 'value').id);
                    }
                }
                this.setSelected(newSelected, 'id');
            }
            else {
                // Single select element
                if (options.selectedIndex !== -1) {
                    const opt = options[options.selectedIndex];
                    const value = opt.value;
                    this.setSelected(value, 'value');
                }
            }
        }
        // Add to the current data array
        add(opt) {
            const obj = {
                data: {},
                disabled: false,
                display: true,
                id: String(Math.floor(Math.random() * 100000000)),
                innerHTML: '',
                placeholder: '',
                selected: false,
                text: opt.text,
                value: opt.value
            };
            this.data.push(obj);
        }
        // Take in search string and return filtered list of values
        search(search) {
            this.searchValue = search;
            if (search.trim() === '') {
                this.filtered = null;
                return;
            }
            const valuesArray = this.data.slice(0);
            search = search.trim().toLowerCase();
            const filtered = valuesArray.map((obj) => {
                // If optgroup
                if (obj.hasOwnProperty('options')) {
                    const optgroupObj = obj;
                    const options = optgroupObj.options.filter((opt) => {
                        return opt.text.toLowerCase().indexOf(search) !== -1;
                    });
                    if (options.length !== 0) {
                        const optgp = Object.assign({}, optgroupObj); // Break pointer
                        optgp.options = options;
                        return optgp;
                    }
                }
                // If single option
                if (obj.hasOwnProperty('text')) {
                    const optionObj = obj;
                    if (optionObj.text.toLowerCase().indexOf(search) !== -1) {
                        return obj;
                    }
                }
                return null;
            });
            // Filter out false values
            this.filtered = filtered.filter((info) => {
                return info;
            });
        }
        // From passed in option pull pieces of usable information
        pullOptionData(opt) {
            return {
                data: opt.dataset,
                disabled: opt.disabled,
                id: (opt.dataset ? opt.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
                innerHTML: opt.innerHTML,
                placeholder: opt.dataset.placeholder || null,
                selected: opt.selected,
                text: opt.text,
                value: opt.value
            };
        }
        // Determines whether or not passed in option should be selected based upon possible values
        shouldBeSelected(opt, value, type = 'id') {
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    if (String(opt[type]) === String(value[i])) {
                        return true;
                    }
                }
            }
            else {
                if (String(opt[type]) === String(value)) {
                    return true;
                }
            }
            return false;
        }
    }
    exports.default = data;
    function validateData(da) {
        if (!da) {
            console.error('Data must be an array of objects');
            return;
        }
        let isValid = false;
        let errorCount = 0;
        for (let i = 0; i < da.length; i++) {
            if (da[i].hasOwnProperty('label')) {
                if (da[i].hasOwnProperty('options')) {
                    const optgp = da[i];
                    const options = optgp.options;
                    for (let j = 0; j < options.length; j++) {
                        isValid = validateOption(options[j]);
                        if (!isValid) {
                            errorCount++;
                        }
                    }
                }
            }
            else {
                const opt = da[i];
                isValid = validateOption(opt);
                if (!isValid) {
                    errorCount++;
                }
            }
        }
        return errorCount === 0;
    }
    exports.validateData = validateData;
    function validateOption(opt) {
        if (opt.text === undefined) {
            console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(opt));
            return false;
        }
        return true;
    }
    exports.validateOption = validateOption;
});
