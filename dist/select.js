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
    class select {
        constructor(info) {
            this.element = info.select;
            this.main = info.main;
            // If original select is set to disabled lets make sure slim is too
            if (this.element.disabled) {
                this.main.config.isEnabled = false;
            }
            this.addAttributes();
            this.addEventListeners();
            this.addMutationObserver();
            // Add slim to original select dropdown
            this.element.slim = info.main;
        }
        setValue() {
            if (!this.main.data.getSelected()) {
                return;
            }
            if (this.main.config.isMultiple) {
                // If multiple loop through options and set selected
                const selected = this.main.data.getSelected();
                const options = this.element.options;
                for (let o = 0; o < options.length; o++) {
                    const opt = options[o];
                    opt.selected = false;
                    for (let s = 0; s < selected.length; s++) {
                        if (selected[s].value === opt.value) {
                            opt.selected = true;
                        }
                    }
                }
            }
            else {
                // If single select simply set value
                const selected = this.main.data.getSelected();
                this.element.value = (selected ? selected.value : '');
            }
            // Do not trigger onChange callbacks for this event listener
            this.main.data.isOnChangeEnabled = false;
            this.element.dispatchEvent(new CustomEvent('change'));
            this.main.data.isOnChangeEnabled = true;
        }
        addAttributes() {
            this.element.tabIndex = -1;
            this.element.style.display = 'none';
            // Add slim select id
            this.element.dataset.ssid = this.main.config.id;
        }
        // Add onChange listener to original select
        addEventListeners() {
            this.element.addEventListener('change', (e) => {
                this.main.data.setSelectedFromSelect();
                this.main.render();
            });
        }
        // Add MutationObserver to select
        addMutationObserver() {
            // Only add if not in ajax mode
            if (this.main.config.isAjax) {
                return;
            }
            this.mutationObserver = new MutationObserver((mutations) => {
                this.main.data.parseSelectData();
                this.main.data.setSelectedFromSelect();
                this.main.render();
            });
            this.observeMutationObserver();
        }
        observeMutationObserver() {
            this.mutationObserver.observe(this.element, {
                attributes: true,
                characterData: true,
                childList: true
            });
        }
        disconnectMutationObserver() {
            if (this.mutationObserver) {
                this.mutationObserver.disconnect();
            }
        }
        // Create select element and optgroup/options
        create(data) {
            // Clear out select
            this.element.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                if (data[i].hasOwnProperty('options')) {
                    const optgroupObject = data[i];
                    const optgp = document.createElement('optgroup');
                    optgp.label = optgroupObject.label;
                    for (let o = 0; o < optgroupObject.options.length; o++) {
                        optgp.appendChild(this.createOption(optgroupObject.options[o]));
                    }
                    this.element.appendChild(optgp);
                }
                else {
                    this.element.appendChild(this.createOption(data[i]));
                }
            }
        }
        createOption(info) {
            const opt = document.createElement('option');
            opt.value = info.value || info.text;
            opt.innerHTML = info.innerHTML || info.text;
            if (info.selected) {
                opt.selected = info.selected;
            }
            if (info.disabled) {
                opt.disabled = true;
            }
            if (info.placeholder) {
                opt.setAttribute('data-placeholder', 'true');
            }
            if (info.data && typeof info.data === 'object') {
                Object.keys(info.data).forEach((key) => {
                    opt.setAttribute('data-' + key, info.data[key]);
                });
            }
            return opt;
        }
    }
    exports.default = select;
});
