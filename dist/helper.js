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
    function hasClassInTree(element, className) {
        return hasClass(element, className) || parentByClass(element, className);
    }
    exports.hasClassInTree = hasClassInTree;
    function ensureElementInView(container, element) {
        // Determine container top and bottom
        const cTop = container.scrollTop + container.offsetTop; // Make sure to have offsetTop
        const cBottom = cTop + container.clientHeight;
        // Determine element top and bottom
        const eTop = element.offsetTop;
        const eBottom = eTop + element.clientHeight;
        // Check if out of view
        if (eTop < cTop) {
            container.scrollTop -= (cTop - eTop);
        }
        else if (eBottom > cBottom) {
            container.scrollTop += (eBottom - cBottom);
        }
    }
    exports.ensureElementInView = ensureElementInView;
    function putContent(el, currentPosition, isOpen) {
        const height = el.offsetHeight;
        const rect = el.getBoundingClientRect();
        const elemTop = (isOpen ? rect.top : rect.top - height);
        const elemBottom = (isOpen ? rect.bottom : rect.bottom + height);
        if (elemTop <= 0) {
            return 'below';
        }
        if (elemBottom >= window.innerHeight) {
            return 'above';
        }
        return (isOpen ? currentPosition : 'below');
    }
    exports.putContent = putContent;
    function debounce(func, wait = 100, immediate = false) {
        let timeout;
        return function (...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
    exports.debounce = debounce;
    function isValueInArrayOfObjects(selected, key, value) {
        if (!Array.isArray(selected)) {
            return selected[key] === value;
        }
        else {
            for (let i = 0; i < selected.length; i++) {
                if (selected[i] && selected[i][key] && selected[i][key] === value) {
                    return true;
                }
            }
            return false;
        }
    }
    exports.isValueInArrayOfObjects = isValueInArrayOfObjects;
    function highlight(text, search, className) {
        const pattern = new RegExp('(>[^<.]*)(' + search.trim() + ')([^<.]*)', 'gi');
        const replaceWith = '$1<span ' + (className ? 'class="' + className + '"' : '') + '">$2</span>$3';
        return text.replace(pattern, replaceWith);
    }
    exports.highlight = highlight;
});
