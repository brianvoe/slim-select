var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define("config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = (function () {
        function config(info) {
            this.id = '';
            this.isMultiple = false;
            this.isAjax = false;
            this.isSearching = false;
            this.showSearch = true;
            this.searchHighlight = false;
            this.closeOnSelect = true;
            this.showContent = 'auto';
            this.searchPlaceholder = 'Search';
            this.searchText = 'No Results';
            this.placeholderText = 'Select Value';
            this.allowDeselect = false;
            this.isEnabled = true;
            this.valuesUseText = false;
            this.showOptionTooltips = false;
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
        return config;
    }());
    exports.default = config;
});
define("helper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function hasClassInTree(element, className) {
        function hasClass(element, className) {
            if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
                return element;
            }
            return null;
        }
        function parentByClass(childElement, className) {
            if (!childElement || childElement === document) {
                return null;
            }
            else if (hasClass(childElement, className)) {
                return childElement;
            }
            else {
                return parentByClass(childElement.parentNode, className);
            }
        }
        return hasClass(element, className) || parentByClass(element, className);
    }
    exports.hasClassInTree = hasClassInTree;
    function ensureElementInView(container, element) {
        var cTop = container.scrollTop + container.offsetTop;
        var cBottom = cTop + container.clientHeight;
        var eTop = element.offsetTop;
        var eBottom = eTop + element.clientHeight;
        if (eTop < cTop) {
            container.scrollTop -= (cTop - eTop);
        }
        else if (eBottom > cBottom) {
            container.scrollTop += (eBottom - cBottom);
        }
    }
    exports.ensureElementInView = ensureElementInView;
    function putContent(el, currentPosition, isOpen) {
        var height = el.offsetHeight;
        var rect = el.getBoundingClientRect();
        var elemTop = (isOpen ? rect.top : rect.top - height);
        var elemBottom = (isOpen ? rect.bottom : rect.bottom + height);
        if (elemTop <= 0) {
            return 'below';
        }
        if (elemBottom >= window.innerHeight) {
            return 'above';
        }
        return (isOpen ? currentPosition : 'below');
    }
    exports.putContent = putContent;
    function debounce(func, wait, immediate) {
        if (wait === void 0) { wait = 100; }
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    }
    exports.debounce = debounce;
    function isValueInArrayOfObjects(selected, key, value) {
        if (!Array.isArray(selected)) {
            return selected[key] === value;
        }
        for (var i = 0; i < selected.length; i++) {
            if (selected[i] && selected[i][key] && selected[i][key] === value) {
                return true;
            }
        }
        return false;
    }
    exports.isValueInArrayOfObjects = isValueInArrayOfObjects;
    function highlight(text, search, className) {
        var pattern = new RegExp('(>[^<.]*)(' + search.trim() + ')([^<.]*)', 'gi');
        var replaceWith = '$1<span ' + (className ? 'class="' + className + '"' : '') + '">$2</span>$3';
        return text.replace(pattern, replaceWith);
    }
    exports.highlight = highlight;
});
define("select", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var select = (function () {
        function select(info) {
            this.element = info.select;
            this.main = info.main;
            if (this.element.disabled) {
                this.main.config.isEnabled = false;
            }
            this.addAttributes();
            this.addEventListeners();
            this.mutationObserver = null;
            this.addMutationObserver();
            var el = this.element;
            el.slim = info.main;
        }
        select.prototype.setValue = function () {
            if (!this.main.data.getSelected()) {
                return;
            }
            if (this.main.config.isMultiple) {
                var selected = this.main.data.getSelected();
                var options = this.element.options;
                for (var o = 0; o < options.length; o++) {
                    var option = options[o];
                    option.selected = false;
                    for (var s = 0; s < selected.length; s++) {
                        if (selected[s].value === option.value) {
                            option.selected = true;
                        }
                    }
                }
            }
            else {
                var selected = this.main.data.getSelected();
                this.element.value = (selected ? selected.value : '');
            }
            this.main.data.isOnChangeEnabled = false;
            this.element.dispatchEvent(new CustomEvent('change'));
            this.main.data.isOnChangeEnabled = true;
        };
        select.prototype.addAttributes = function () {
            this.element.tabIndex = -1;
            this.element.style.display = 'none';
            this.element.dataset.ssid = this.main.config.id;
        };
        select.prototype.addEventListeners = function () {
            var _this = this;
            this.element.addEventListener('change', function (e) {
                _this.main.data.setSelectedFromSelect();
                _this.main.render();
            });
        };
        select.prototype.addMutationObserver = function () {
            var _this = this;
            if (this.main.config.isAjax) {
                return;
            }
            this.mutationObserver = new MutationObserver(function (mutations) {
                _this.main.data.parseSelectData();
                _this.main.data.setSelectedFromSelect();
                _this.main.render();
            });
            this.observeMutationObserver();
        };
        select.prototype.observeMutationObserver = function () {
            if (!this.mutationObserver) {
                return;
            }
            this.mutationObserver.observe(this.element, {
                attributes: true,
                childList: true,
                characterData: true
            });
        };
        select.prototype.disconnectMutationObserver = function () {
            if (this.mutationObserver) {
                this.mutationObserver.disconnect();
            }
        };
        select.prototype.create = function (data) {
            this.element.innerHTML = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].hasOwnProperty('options')) {
                    var optgroupObject = data[i];
                    var optgroup = document.createElement('optgroup');
                    optgroup.label = optgroupObject.label;
                    for (var o = 0; o < optgroupObject.options.length; o++) {
                        optgroup.appendChild(this.createOption(optgroupObject.options[o]));
                    }
                    this.element.appendChild(optgroup);
                }
                else {
                    this.element.appendChild(this.createOption(data[i]));
                }
            }
        };
        select.prototype.createOption = function (info) {
            var option = document.createElement('option');
            option.value = info.value || info.text;
            option.innerHTML = info.innerHTML || info.text;
            if (info.selected) {
                option.selected = info.selected;
            }
            if (info.disabled) {
                option.disabled = true;
            }
            if (info.placeholder) {
                option.setAttribute('data-placeholder', 'true');
            }
            if (info.data && typeof info.data === 'object') {
                Object.keys(info.data).forEach(function (key) {
                    option.setAttribute('data-' + key, info.data[key]);
                });
            }
            return option;
        };
        return select;
    }());
    exports.default = select;
});
define("slim", ["require", "exports", "helper", "data"], function (require, exports, helper_1, data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var slim = (function () {
        function slim(info) {
            this.main = info.main;
            this.container = this.containerDiv();
            this.content = this.contentDiv();
            this.search = this.searchDiv();
            this.list = this.listDiv();
            this.options();
            if (this.main.config.isMultiple) {
                this.multiSelected = this.multiSelectedDiv();
                this.container.appendChild(this.multiSelected.container);
            }
            else {
                this.singleSelected = this.singleSelectedDiv();
                this.container.appendChild(this.singleSelected.container);
            }
            this.container.appendChild(this.content);
            this.content.appendChild(this.search.container);
            this.content.appendChild(this.list);
        }
        slim.prototype.containerDiv = function () {
            var container = document.createElement('div');
            container.classList.add(this.main.config.id);
            container.classList.add(this.main.config.main);
            container.style.cssText = this.main.config.style;
            for (var i = 0; i < this.main.config.class.length; i++) {
                container.classList.add(this.main.config.class[i]);
            }
            return container;
        };
        slim.prototype.singleSelectedDiv = function () {
            var _this = this;
            var container = document.createElement('div');
            container.classList.add(this.main.config.singleSelected);
            var placeholder = document.createElement('span');
            placeholder.classList.add('placeholder');
            container.appendChild(placeholder);
            var deselect = null;
            deselect = document.createElement('span');
            deselect.innerHTML = 'X';
            deselect.classList.add('ss-deselect');
            deselect.onclick = function (e) {
                _this.main.set('');
                e.stopPropagation();
            };
            container.appendChild(deselect);
            var arrowContainer = document.createElement('span');
            arrowContainer.classList.add(this.main.config.arrow);
            var arrowIcon = document.createElement('span');
            arrowIcon.classList.add('arrow-down');
            arrowContainer.appendChild(arrowIcon);
            container.appendChild(arrowContainer);
            container.onclick = function () {
                if (!_this.main.config.isEnabled) {
                    return;
                }
                _this.main.data.contentOpen ? _this.main.close() : _this.main.open();
            };
            return {
                container: container,
                placeholder: placeholder,
                deselect: deselect,
                arrowIcon: {
                    container: arrowContainer,
                    arrow: arrowIcon
                }
            };
        };
        slim.prototype.placeholder = function () {
            var selected = this.main.data.getSelected();
            if (selected === null || (selected && selected.placeholder)) {
                var placeholder = document.createElement('span');
                placeholder.classList.add(this.main.config.disabled);
                placeholder.innerHTML = this.main.config.placeholderText;
                this.singleSelected.placeholder.innerHTML = placeholder.outerHTML;
            }
            else {
                var selectedValue = '';
                if (selected) {
                    selectedValue = selected.innerHTML && this.main.config.valuesUseText !== true ? selected.innerHTML : selected.text;
                }
                this.singleSelected.placeholder.innerHTML = (selected ? selectedValue : '');
            }
        };
        slim.prototype.deselect = function () {
            if (!this.main.config.allowDeselect) {
                this.singleSelected.deselect.classList.add('ss-hide');
                return;
            }
            if (this.main.selected() === '') {
                this.singleSelected.deselect.classList.add('ss-hide');
            }
            else {
                this.singleSelected.deselect.classList.remove('ss-hide');
            }
        };
        slim.prototype.multiSelectedDiv = function () {
            var _this = this;
            var container = document.createElement('div');
            container.classList.add(this.main.config.multiSelected);
            var values = document.createElement('div');
            values.classList.add(this.main.config.values);
            container.appendChild(values);
            var add = document.createElement('div');
            add.classList.add(this.main.config.add);
            var plus = document.createElement('span');
            plus.classList.add(this.main.config.plus);
            plus.onclick = function (e) {
                if (_this.main.data.contentOpen) {
                    _this.main.close();
                    e.stopPropagation();
                }
            };
            add.appendChild(plus);
            container.appendChild(add);
            container.onclick = function (e) {
                if (!_this.main.config.isEnabled) {
                    return;
                }
                var target = e.target;
                if (!target.classList.contains(_this.main.config.valueDelete)) {
                    _this.main.open();
                }
            };
            return {
                container: container,
                values: values,
                add: add,
                plus: plus
            };
        };
        slim.prototype.values = function () {
            if (!this.main.config.isMultiple) {
                return;
            }
            var currentNodes = this.multiSelected.values.childNodes;
            var selected = this.main.data.getSelected();
            var exists;
            var nodesToRemove = [];
            for (var c = 0; c < currentNodes.length; c++) {
                exists = true;
                var node = currentNodes[c];
                for (var s = 0; s < selected.length; s++) {
                    if (String(selected[s].id) === String(node.dataset.id)) {
                        exists = false;
                    }
                }
                if (exists) {
                    nodesToRemove.push(node);
                }
            }
            for (var i = 0; i < nodesToRemove.length; i++) {
                nodesToRemove[i].classList.add('ss-out');
                this.multiSelected.values.removeChild(nodesToRemove[i]);
            }
            currentNodes = this.multiSelected.values.childNodes;
            for (var s = 0; s < selected.length; s++) {
                exists = false;
                for (var c = 0; c < currentNodes.length; c++) {
                    var node = currentNodes[c];
                    if (String(selected[s].id) === String(node.dataset.id)) {
                        exists = true;
                    }
                }
                if (!exists) {
                    if (currentNodes.length === 0) {
                        this.multiSelected.values.appendChild(this.valueDiv(selected[s]));
                    }
                    else if (s === 0) {
                        this.multiSelected.values.insertBefore(this.valueDiv(selected[s]), currentNodes[s]);
                    }
                    else {
                        currentNodes[s - 1].insertAdjacentElement('afterend', this.valueDiv(selected[s]));
                    }
                }
            }
            if (selected.length === 0) {
                var placeholder = document.createElement('span');
                placeholder.classList.add(this.main.config.disabled);
                placeholder.innerHTML = this.main.config.placeholderText;
                this.multiSelected.values.innerHTML = placeholder.outerHTML;
            }
        };
        slim.prototype.valueDiv = function (option) {
            var _this = this;
            var value = document.createElement('div');
            value.classList.add(this.main.config.value);
            value.dataset.id = option.id;
            var text = document.createElement('span');
            text.classList.add(this.main.config.valueText);
            text.innerHTML = (option.innerHTML && this.main.config.valuesUseText !== true ? option.innerHTML : option.text);
            value.appendChild(text);
            var deleteSpan = document.createElement('span');
            deleteSpan.classList.add(this.main.config.valueDelete);
            deleteSpan.innerHTML = 'x';
            deleteSpan.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!_this.main.config.isEnabled) {
                    return;
                }
                if (_this.main.beforeOnChange) {
                    var selected = _this.main.data.getSelected();
                    var currentValues = JSON.parse(JSON.stringify(selected));
                    for (var i = 0; i < currentValues.length; i++) {
                        if (currentValues[i].id === option.id) {
                            currentValues.splice(i, 1);
                        }
                    }
                    var beforeOnchange = _this.main.beforeOnChange(currentValues);
                    if (beforeOnchange !== false) {
                        _this.main.data.removeFromSelected(option.id, 'id');
                        _this.main.render();
                        _this.main.select.setValue();
                    }
                }
                else {
                    _this.main.data.removeFromSelected(option.id, 'id');
                    _this.main.render();
                    _this.main.select.setValue();
                    _this.main.data.onDataChange();
                }
            };
            value.appendChild(deleteSpan);
            return value;
        };
        slim.prototype.contentDiv = function () {
            var container = document.createElement('div');
            container.classList.add(this.main.config.content);
            return container;
        };
        slim.prototype.searchDiv = function () {
            var _this = this;
            var container = document.createElement('div');
            var input = document.createElement('input');
            container.classList.add(this.main.config.search);
            if (!this.main.config.showSearch) {
                container.classList.add(this.main.config.hide);
                input.readOnly = true;
            }
            input.type = 'search';
            input.placeholder = this.main.config.searchPlaceholder;
            input.tabIndex = 0;
            input.onclick = function (e) {
                setTimeout(function () {
                    var target = e.target;
                    if (target.value === '') {
                        _this.main.search('');
                    }
                }, 10);
            };
            input.onkeydown = function (e) {
                if (e.key === 'ArrowUp') {
                    _this.main.open();
                    _this.highlightUp();
                    e.preventDefault();
                }
                else if (e.key === 'ArrowDown') {
                    _this.main.open();
                    _this.highlightDown();
                    e.preventDefault();
                }
                else if (e.key === 'Tab') {
                    _this.main.close();
                }
                else if (e.key === 'Enter') {
                    e.preventDefault();
                }
            };
            input.onkeyup = function (e) {
                var target = e.target;
                if (e.key === 'Enter') {
                    if (_this.main.addable && e.ctrlKey) {
                        addable.click();
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    var highlighted = _this.list.querySelector('.' + _this.main.config.highlighted);
                    if (highlighted) {
                        highlighted.click();
                    }
                }
                else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                }
                else if (e.key === 'Escape') {
                    _this.main.close();
                }
                else {
                    if (_this.main.config.showSearch && _this.main.data.contentOpen) {
                        _this.main.search(target.value);
                    }
                    else {
                        input.value = '';
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            };
            input.onfocus = function () { _this.main.open(); };
            container.appendChild(input);
            if (this.main.addable) {
                var addable = document.createElement('div');
                addable.classList.add(this.main.config.addable);
                addable.innerHTML = '+';
                addable.onclick = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var inputValue = _this.search.input.value;
                    if (inputValue.trim() === '') {
                        _this.search.input.focus();
                        return;
                    }
                    var addableValue = _this.main.addable(inputValue);
                    var addableValueStr = '';
                    if (!addableValue) {
                        return;
                    }
                    if (typeof addableValue == 'object') {
                        var validValue = data_1.validateOption(addableValue);
                        if (validValue) {
                            _this.main.addData(addableValue);
                            addableValueStr = (addableValue.value ? addableValue.value : addableValue.text);
                        }
                    }
                    else {
                        _this.main.addData(_this.main.data.newOption({
                            text: addableValue,
                            value: addableValue
                        }));
                        addableValueStr = addableValue;
                    }
                    _this.main.search('');
                    setTimeout(function () {
                        _this.main.set(addableValueStr, 'value', false, false);
                    }, 100);
                    if (_this.main.config.closeOnSelect) {
                        setTimeout(function () {
                            _this.main.close();
                        }, 100);
                    }
                };
                container.appendChild(addable);
            }
            return {
                container: container,
                input: input,
                addable: addable
            };
        };
        slim.prototype.highlightUp = function () {
            var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
            var prev = null;
            if (highlighted) {
                prev = highlighted.previousSibling;
                while (prev !== null) {
                    if (prev.classList.contains(this.main.config.disabled)) {
                        prev = prev.previousSibling;
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                var allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                prev = allOptions[allOptions.length - 1];
            }
            if (prev && prev.classList.contains(this.main.config.optgroupLabel)) {
                prev = null;
            }
            if (prev === null) {
                var parent = highlighted.parentNode;
                if (parent.classList.contains(this.main.config.optgroup)) {
                    if (parent.previousSibling) {
                        var prevNodes = parent.previousSibling.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                        if (prevNodes.length) {
                            prev = prevNodes[prevNodes.length - 1];
                        }
                    }
                }
            }
            if (prev) {
                if (highlighted) {
                    highlighted.classList.remove(this.main.config.highlighted);
                }
                prev.classList.add(this.main.config.highlighted);
                helper_1.ensureElementInView(this.list, prev);
            }
        };
        slim.prototype.highlightDown = function () {
            var highlighted = this.list.querySelector('.' + this.main.config.highlighted);
            var next = null;
            if (highlighted) {
                next = highlighted.nextSibling;
                while (next !== null) {
                    if (next.classList.contains(this.main.config.disabled)) {
                        next = next.nextSibling;
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                next = this.list.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
            }
            if (next === null && highlighted !== null) {
                var parent = highlighted.parentNode;
                if (parent.classList.contains(this.main.config.optgroup)) {
                    if (parent.nextSibling) {
                        var sibling = parent.nextSibling;
                        next = sibling.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
                    }
                }
            }
            if (next) {
                if (highlighted) {
                    highlighted.classList.remove(this.main.config.highlighted);
                }
                next.classList.add(this.main.config.highlighted);
                helper_1.ensureElementInView(this.list, next);
            }
        };
        slim.prototype.listDiv = function () {
            var list = document.createElement('div');
            list.classList.add(this.main.config.list);
            list.onmousewheel = function (e) {
                var scrollTop = list.scrollTop, scrollHeight = list.scrollHeight, height = list.offsetHeight, delta = (e.type == 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta), up = delta > 0;
                var prevent = function () {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    return false;
                };
                if (!up && -delta > scrollHeight - height - scrollTop) {
                    list.scrollTop = scrollHeight;
                    return prevent();
                }
                else if (up && delta > scrollTop) {
                    list.scrollTop = 0;
                    return prevent();
                }
            };
            return list;
        };
        slim.prototype.options = function (content) {
            if (content === void 0) { content = ''; }
            var data = this.main.data.filtered || this.main.data.data;
            this.list.innerHTML = '';
            if (content !== '') {
                var searching = document.createElement('div');
                searching.classList.add(this.main.config.option);
                searching.classList.add(this.main.config.disabled);
                searching.innerHTML = content;
                this.list.appendChild(searching);
                return;
            }
            if (this.main.config.isAjax && this.main.config.isSearching) {
                var searching = document.createElement('div');
                searching.classList.add(this.main.config.option);
                searching.classList.add(this.main.config.disabled);
                searching.innerHTML = 'Searching...';
                this.list.appendChild(searching);
                return;
            }
            if (data.length === 0) {
                var noResults = document.createElement('div');
                noResults.classList.add(this.main.config.option);
                noResults.classList.add(this.main.config.disabled);
                noResults.innerHTML = this.main.config.searchText;
                this.list.appendChild(noResults);
                return;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].hasOwnProperty('label')) {
                    var item = data[i];
                    var optgroup = document.createElement('div');
                    optgroup.classList.add(this.main.config.optgroup);
                    var optgroupLabel = document.createElement('div');
                    optgroupLabel.classList.add(this.main.config.optgroupLabel);
                    optgroupLabel.innerHTML = item.label;
                    optgroup.appendChild(optgroupLabel);
                    var options = item.options;
                    for (var ii = 0; ii < options.length; ii++) {
                        optgroup.appendChild(this.option(options[ii]));
                    }
                    this.list.appendChild(optgroup);
                }
                else {
                    this.list.appendChild(this.option(data[i]));
                }
            }
        };
        slim.prototype.option = function (data) {
            if (data.placeholder) {
                var placeholder = document.createElement('div');
                placeholder.classList.add(this.main.config.option);
                placeholder.classList.add(this.main.config.hide);
                return placeholder;
            }
            var option = document.createElement('div');
            option.classList.add(this.main.config.option);
            var selected = this.main.data.getSelected();
            option.dataset.id = data.id;
            if (this.main.config.searchHighlight && this.main.slim && this.main.slim.search.input.value.trim() !== '') {
                option.innerHTML = helper_1.highlight(data.innerHTML, this.main.slim.search.input.value, this.main.config.searchHighlighter);
            }
            else {
                option.innerHTML = data.innerHTML;
            }
            if (this.main.config.showOptionTooltips) {
                option.setAttribute('title', option.textContent);
            }
            var master = this;
            option.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                var element = this;
                var elementID = element.dataset.id;
                if (master.main.beforeOnChange) {
                    var value = void 0;
                    var objectInfo = JSON.parse(JSON.stringify(master.main.data.getObjectFromData(elementID)));
                    objectInfo.selected = true;
                    if (master.main.config.isMultiple) {
                        value = JSON.parse(JSON.stringify(selected));
                        value.push(objectInfo);
                    }
                    else {
                        value = JSON.parse(JSON.stringify(objectInfo));
                    }
                    var beforeOnchange = master.main.beforeOnChange(value);
                    if (beforeOnchange !== false) {
                        master.main.set(elementID, 'id', master.main.config.closeOnSelect);
                    }
                }
                else {
                    master.main.set(elementID, 'id', master.main.config.closeOnSelect);
                }
            };
            if (data.disabled || (selected && helper_1.isValueInArrayOfObjects(selected, 'id', data.id))) {
                option.onclick = null;
                option.classList.add(this.main.config.disabled);
            }
            return option;
        };
        return slim;
    }());
    exports.default = slim;
});
define("index", ["require", "exports", "config", "helper", "select", "data", "slim", "custom-event-polyfill"], function (require, exports, config_1, helper_2, select_1, data_2, slim_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_1 = __importDefault(config_1);
    select_1 = __importDefault(select_1);
    data_2 = __importStar(data_2);
    slim_1 = __importDefault(slim_1);
    var SlimSelect = (function () {
        function SlimSelect(info) {
            var _this = this;
            this.ajax = null;
            this.addable = null;
            this.beforeOnChange = null;
            this.onChange = null;
            this.beforeOpen = null;
            this.afterOpen = null;
            this.beforeClose = null;
            this.afterClose = null;
            this.validate(info);
            var selectElement = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
            if (selectElement.dataset.ssid) {
                this.destroy(selectElement.dataset.ssid);
            }
            if (info.ajax) {
                this.ajax = info.ajax;
            }
            if (info.addable) {
                this.addable = info.addable;
            }
            this.config = new config_1.default({
                select: selectElement,
                isAjax: (info.ajax ? true : false),
                showSearch: info.showSearch,
                searchPlaceholder: info.searchPlaceholder,
                searchText: info.searchText,
                searchHighlight: info.searchHighlight,
                closeOnSelect: info.closeOnSelect,
                showContent: info.showContent,
                placeholderText: info.placeholder,
                allowDeselect: info.allowDeselect,
                isEnabled: info.isEnabled,
                valuesUseText: info.valuesUseText,
                showOptionTooltips: info.showOptionTooltips
            });
            this.select = new select_1.default({
                select: selectElement,
                main: this
            });
            this.data = new data_2.default({ main: this });
            this.slim = new slim_1.default({ main: this });
            if (this.select.element.parentNode) {
                this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling);
            }
            if (info.data) {
                this.setData(info.data);
            }
            else {
                this.render();
            }
            document.addEventListener('click', function (e) {
                if (!helper_2.hasClassInTree(e.target, _this.config.id)) {
                    _this.close();
                }
            });
            window.addEventListener('scroll', helper_2.debounce(function (e) {
                if (_this.data.contentOpen && _this.config.showContent === 'auto') {
                    if (helper_2.putContent(_this.slim.content, _this.data.contentPosition, _this.data.contentOpen) === 'above') {
                        _this.moveContentAbove();
                    }
                    else {
                        _this.moveContentBelow();
                    }
                }
            }), false);
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
        SlimSelect.prototype.validate = function (info) {
            var select = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select);
            if (!select) {
                throw new Error('Could not find select element');
            }
            if (select.tagName !== 'SELECT') {
                throw new Error('Element isnt of type select');
            }
        };
        SlimSelect.prototype.selected = function () {
            if (this.config.isMultiple) {
                var selected = this.data.getSelected();
                var outputSelected = [];
                for (var i = 0; i < selected.length; i++) {
                    outputSelected.push(selected[i].value);
                }
                return outputSelected;
            }
            else {
                var selected = this.data.getSelected();
                return (selected ? selected.value : '');
            }
        };
        SlimSelect.prototype.set = function (value, type, close, render) {
            if (type === void 0) { type = 'value'; }
            if (close === void 0) { close = true; }
            if (render === void 0) { render = true; }
            if (this.config.isMultiple && !Array.isArray(value)) {
                this.data.addToSelected(value, type);
            }
            else {
                this.data.setSelected(value, type);
            }
            this.select.setValue();
            this.data.onDataChange();
            this.render();
            if (close) {
                this.close();
            }
        };
        SlimSelect.prototype.setSelected = function (value, type, close, render) {
            if (type === void 0) { type = 'value'; }
            if (close === void 0) { close = true; }
            if (render === void 0) { render = true; }
            this.set(value, type, close, render);
        };
        SlimSelect.prototype.setData = function (data) {
            var isValid = data_2.validateData(data);
            if (!isValid) {
                console.error('Validation problem on: #' + this.select.element.id);
                return;
            }
            var newData = JSON.parse(JSON.stringify(data));
            var selected = this.data.getSelected();
            if (this.config.isAjax && selected) {
                if (this.config.isMultiple) {
                    var reverseSelected = selected.reverse();
                    for (var i = 0; i < reverseSelected.length; i++) {
                        newData.unshift(reverseSelected[i]);
                    }
                }
                else {
                    newData.unshift(this.data.getSelected());
                    newData.unshift({
                        text: '',
                        placeholder: true
                    });
                }
            }
            this.select.create(newData);
            this.data.parseSelectData();
            this.data.setSelectedFromSelect();
        };
        SlimSelect.prototype.addData = function (data) {
            var isValid = data_2.validateData([data]);
            if (!isValid) {
                console.error('Validation problem on: #' + this.select.element.id);
                return;
            }
            var option = this.data.newOption(data);
            this.data.add(option);
            this.select.create(this.data.data);
            this.data.parseSelectData();
            this.data.setSelectedFromSelect();
            this.render();
        };
        SlimSelect.prototype.open = function () {
            var _this = this;
            if (!this.config.isEnabled) {
                return;
            }
            if (this.data.contentOpen) {
                return;
            }
            this.slim.search.input.focus();
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
            if (this.config.showContent.toLowerCase() === 'up') {
                this.moveContentAbove();
            }
            else if (this.config.showContent.toLowerCase() === 'down') {
                this.moveContentBelow();
            }
            else {
                if (helper_2.putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                    this.moveContentAbove();
                }
                else {
                    this.moveContentBelow();
                }
            }
            if (!this.config.isMultiple) {
                var selected = this.data.getSelected();
                if (selected) {
                    var selectedId = selected.id;
                    var selectedOption = this.slim.list.querySelector('[data-id="' + selectedId + '"]');
                    if (selectedOption) {
                        helper_2.ensureElementInView(this.slim.list, selectedOption);
                    }
                }
            }
            setTimeout(function () {
                _this.data.contentOpen = true;
                if (_this.afterOpen) {
                    _this.afterOpen();
                }
            }, 300);
        };
        SlimSelect.prototype.close = function () {
            var _this = this;
            if (!this.data.contentOpen) {
                return;
            }
            if (this.beforeClose) {
                this.beforeClose();
            }
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
            this.search('');
            setTimeout(function () {
                _this.slim.content.removeAttribute('style');
                _this.data.contentPosition = 'below';
                _this.slim[(_this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(_this.config.openAbove);
                _this.slim[(_this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(_this.config.openBelow);
                _this.slim.search.input.blur();
                if (_this.afterClose) {
                    _this.afterClose();
                }
            }, 300);
        };
        SlimSelect.prototype.moveContentAbove = function () {
            var selectHeight = (this.config.isMultiple ? this.slim.multiSelected.container.offsetHeight : this.slim.singleSelected.container.offsetHeight);
            var contentHeight = this.slim.content.offsetHeight;
            var height = selectHeight + contentHeight - 1;
            this.slim.content.style.margin = '-' + height + 'px 0 0 0';
            this.slim.content.style.height = (height - selectHeight + 1) + 'px';
            this.slim.content.style.transformOrigin = 'center bottom';
            this.data.contentPosition = 'above';
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openBelow);
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openAbove);
        };
        SlimSelect.prototype.moveContentBelow = function () {
            this.slim.content.removeAttribute('style');
            this.data.contentPosition = 'below';
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openAbove);
            this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openBelow);
        };
        SlimSelect.prototype.enable = function () {
            this.config.isEnabled = true;
            if (this.config.isMultiple) {
                this.slim.multiSelected.container.classList.remove(this.config.disabled);
            }
            else {
                this.slim.singleSelected.container.classList.remove(this.config.disabled);
            }
            this.select.disconnectMutationObserver();
            this.select.element.disabled = false;
            this.slim.search.input.disabled = false;
            this.select.observeMutationObserver();
        };
        SlimSelect.prototype.disable = function () {
            this.config.isEnabled = false;
            if (this.config.isMultiple) {
                this.slim.multiSelected.container.classList.add(this.config.disabled);
            }
            else {
                this.slim.singleSelected.container.classList.add(this.config.disabled);
            }
            this.select.disconnectMutationObserver();
            this.select.element.disabled = true;
            this.slim.search.input.disabled = true;
            this.select.observeMutationObserver();
        };
        SlimSelect.prototype.search = function (value) {
            if (this.data.searchValue !== value) {
                this.slim.search.input.value = value;
                if (this.config.isAjax) {
                    if (value.trim() === '') {
                        this.setData([]);
                        this.data.search('');
                        this.render();
                    }
                    else {
                        var master_1 = this;
                        this.config.isSearching = true;
                        this.render();
                        this.ajax(value, function (info) {
                            master_1.config.isSearching = false;
                            if (Array.isArray(info)) {
                                info.unshift({ text: '', placeholder: true });
                                master_1.setData(info);
                                master_1.data.search(value);
                                master_1.render();
                            }
                            else if (typeof info === 'string') {
                                master_1.slim.options(info);
                            }
                            else {
                                master_1.render();
                            }
                        });
                    }
                }
                else {
                    this.data.search(value);
                    this.render();
                }
            }
        };
        SlimSelect.prototype.setSearchText = function (text) {
            this.config.searchText = text;
        };
        SlimSelect.prototype.render = function () {
            if (this.config.isMultiple) {
                this.slim.values();
            }
            else {
                this.slim.placeholder();
                this.slim.deselect();
            }
            this.slim.options();
        };
        SlimSelect.prototype.destroy = function (id) {
            if (id === void 0) { id = null; }
            var slim = (id ? document.querySelector('.' + id) : this.slim.container);
            var select = (id ? document.querySelector("[data-ssid=" + id + "]") : this.select.element);
            if (!slim || !select) {
                return;
            }
            select.style.display = null;
            delete select.dataset.ssid;
            var el = this.select.element;
            el.slim = null;
            if (slim.parentElement) {
                slim.parentElement.removeChild(slim);
            }
        };
        return SlimSelect;
    }());
    exports.default = SlimSelect;
});
define("data", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var data = (function () {
        function data(info) {
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
        data.prototype.newOption = function (info) {
            return {
                id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
                value: (info.value ? info.value : ''),
                text: (info.text ? info.text : ''),
                innerHTML: (info.innerHTML ? info.innerHTML : ''),
                selected: (info.selected ? info.selected : false),
                display: (info.display ? info.display : true),
                disabled: (info.disabled ? info.disabled : false),
                placeholder: (info.placeholder ? info.placeholder : ''),
                data: (info.data ? info.data : {}),
            };
        };
        data.prototype.add = function (data) {
            var dataObject = {
                id: String(Math.floor(Math.random() * 100000000)),
                value: data.value,
                text: data.text,
                innerHTML: '',
                selected: false,
                display: true,
                disabled: false,
                placeholder: '',
                data: {}
            };
            this.data.push(dataObject);
        };
        data.prototype.parseSelectData = function () {
            this.data = [];
            var element = this.main.select.element;
            var nodes = element.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeName === 'OPTGROUP') {
                    var node = nodes[i];
                    var optgroup = {
                        label: node.label,
                        options: []
                    };
                    var options = nodes[i].childNodes;
                    for (var ii = 0; ii < options.length; ii++) {
                        if (options[ii].nodeName === 'OPTION') {
                            optgroup.options.push(this.pullOptionData(options[ii]));
                        }
                    }
                    this.data.push(optgroup);
                }
                else if (nodes[i].nodeName === 'OPTION') {
                    this.data.push(this.pullOptionData(nodes[i]));
                }
            }
        };
        data.prototype.pullOptionData = function (option) {
            return {
                id: (option.dataset ? option.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
                value: option.value,
                text: option.text,
                innerHTML: option.innerHTML,
                selected: option.selected,
                disabled: option.disabled,
                placeholder: option.dataset.placeholder || null,
                data: option.dataset
            };
        };
        data.prototype.setSelectedFromSelect = function () {
            var options = this.main.select.element.options;
            if (this.main.config.isMultiple) {
                var newSelected = [];
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    if (option.selected) {
                        newSelected.push(this.getObjectFromData(option.value, 'value').id);
                    }
                }
                this.setSelected(newSelected, 'id');
            }
            else {
                if (options.selectedIndex !== -1) {
                    var option = options[options.selectedIndex];
                    var value = option.value;
                    this.setSelected(value, 'value');
                }
            }
        };
        data.prototype.setSelected = function (value, type) {
            if (type === void 0) { type = 'id'; }
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].hasOwnProperty('label')) {
                    if (this.data[i].hasOwnProperty('options')) {
                        var options = this.data[i].options;
                        for (var o = 0; o < options.length; o++) {
                            options[o].selected = this.shouldBeSelected(options[o], value, type);
                        }
                    }
                }
                else {
                    this.data[i].selected = this.shouldBeSelected(this.data[i], value, type);
                }
            }
        };
        data.prototype.shouldBeSelected = function (option, value, type) {
            if (type === void 0) { type = 'id'; }
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    if (String(option[type]) === String(value[i])) {
                        return true;
                    }
                }
            }
            else {
                if (String(option[type]) === String(value)) {
                    return true;
                }
            }
            return false;
        };
        data.prototype.getSelected = function () {
            var value = null;
            var values = [];
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].hasOwnProperty('label')) {
                    if (this.data[i].hasOwnProperty('options')) {
                        var options = this.data[i].options;
                        for (var o = 0; o < options.length; o++) {
                            if (options[o].selected) {
                                if (!this.main.config.isMultiple) {
                                    value = options[o];
                                }
                                else {
                                    values.push(options[o]);
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.data[i].selected) {
                        if (!this.main.config.isMultiple) {
                            value = this.data[i];
                        }
                        else {
                            values.push(this.data[i]);
                        }
                    }
                }
            }
            if (this.main.config.isMultiple) {
                return values;
            }
            return value;
        };
        data.prototype.addToSelected = function (value, type) {
            if (type === void 0) { type = 'id'; }
            if (this.main.config.isMultiple) {
                var values = [];
                var selected = this.getSelected();
                for (var i = 0; i < selected.length; i++) {
                    values.push(selected[i][type]);
                }
                values.push(value);
                this.setSelected(values, type);
            }
        };
        data.prototype.removeFromSelected = function (value, type) {
            if (type === void 0) { type = 'id'; }
            if (this.main.config.isMultiple) {
                var values = [];
                var selected = this.getSelected();
                for (var i = 0; i < selected.length; i++) {
                    if (String(selected[i][type]) !== String(value)) {
                        values.push(selected[i][type]);
                    }
                }
                this.setSelected(values, type);
            }
        };
        data.prototype.onDataChange = function () {
            if (this.main.onChange && this.isOnChangeEnabled) {
                this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
            }
        };
        data.prototype.getObjectFromData = function (value, type) {
            if (type === void 0) { type = 'id'; }
            for (var i = 0; i < this.data.length; i++) {
                if (type in this.data[i] && String(this.data[i][type]) === String(value)) {
                    return this.data[i];
                }
                if (this.data[i].hasOwnProperty('options')) {
                    var optgroupObject = this.data[i];
                    for (var ii = 0; ii < optgroupObject.options.length; ii++) {
                        if (String(optgroupObject.options[ii][type]) === String(value)) {
                            return optgroupObject.options[ii];
                        }
                    }
                }
            }
            return null;
        };
        data.prototype.search = function (search) {
            this.searchValue = search;
            if (search.trim() === '') {
                this.filtered = null;
                return;
            }
            var valuesArray = this.data.slice(0);
            search = search.trim().toLowerCase();
            var filtered = valuesArray.map(function (obj) {
                if (obj.hasOwnProperty('options')) {
                    var optgroupObj = obj;
                    var options = optgroupObj.options.filter(function (opt) {
                        return opt.text.toLowerCase().indexOf(search) !== -1;
                    });
                    if (options.length !== 0) {
                        var optgroup = Object.assign({}, optgroupObj);
                        optgroup.options = options;
                        return optgroup;
                    }
                }
                if (obj.hasOwnProperty('text')) {
                    var optionObj = obj;
                    if (optionObj.text.toLowerCase().indexOf(search) !== -1) {
                        return obj;
                    }
                }
                return null;
            });
            this.filtered = filtered.filter(function (info) { return info; });
        };
        return data;
    }());
    exports.default = data;
    function validateData(data) {
        if (!data) {
            console.error('Data must be an array of objects');
            return;
        }
        var isValid = false;
        var errorCount = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('label')) {
                if (data[i].hasOwnProperty('options')) {
                    var optgroup = data[i];
                    var options = optgroup.options;
                    for (var j = 0; j < options.length; j++) {
                        isValid = validateOption(options[j]);
                        if (!isValid) {
                            errorCount++;
                        }
                    }
                }
            }
            else {
                var option = data[i];
                isValid = validateOption(option);
                if (!isValid) {
                    errorCount++;
                }
            }
        }
        return errorCount === 0;
    }
    exports.validateData = validateData;
    function validateOption(option) {
        if (option.text === undefined) {
            console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(option));
            return false;
        }
        return true;
    }
    exports.validateOption = validateOption;
});
//# sourceMappingURL=slimselect.js.map