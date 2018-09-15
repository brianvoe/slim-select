import { option } from './data';

function hasClass(element: Element, className: string) {
	if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
		return element;
	}
	return null;
}

function parentByClass(childElement: Element | Document, className: string): Element {
	if (!childElement || childElement === document) {
		return null;
	} else if (hasClass(childElement as Element, className)) {
		return childElement as Element;
	} else {
		return parentByClass(childElement.parentNode as Element, className);
	}
}

export function hasClassInTree(element: Element, className: string) {
	return hasClass(element, className) || parentByClass(element, className);
}

export function ensureElementInView(container: HTMLElement, element: HTMLElement) {
	// Determine container top and bottom
	const cTop = container.scrollTop + container.offsetTop; // Make sure to have offsetTop
	const cBottom = cTop + container.clientHeight;

	// Determine element top and bottom
	const eTop = element.offsetTop;
	const eBottom = eTop + element.clientHeight;

	// Check if out of view
	if (eTop < cTop) {
		container.scrollTop -= (cTop - eTop);
	} else if (eBottom > cBottom) {
		container.scrollTop += (eBottom - cBottom);
	}
}

export function putContent(el: HTMLElement, currentPosition: string, isOpen: boolean) {
	const height = el.offsetHeight;
	const rect = el.getBoundingClientRect();
	const elemTop = (isOpen ? rect.top : rect.top - height);
	const elemBottom = (isOpen ? rect.bottom : rect.bottom + height);

	if (elemTop <= 0) { return 'below'; }
	if (elemBottom >= window.innerHeight) { return 'above'; }
	return (isOpen ? currentPosition : 'below');
}

export function debounce(func: (...args: any[]) => any, wait = 100, immediate = false) {
	let timeout: number;
	return function (this: any, ...args: any[]) {
		const context = this;
		const later = () => {
			timeout = null;
			if (!immediate) { func.apply(context, args); }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) { func.apply(context, args); }
	};
}

export function isValueInArrayOfObjects(selected: option | option[], key: string, value: string) {
	if (!Array.isArray(selected)) {
		return selected[key] === value;
	} else {
		for (let i = 0; i < selected.length; i++) {
			if (selected[i] && selected[i][key] && selected[i][key] === value) {
				return true;
			}
		}

		return false;
	}
}

export function highlight(text: string, search: string, className: string): string {
	const pattern = new RegExp('(>[^<.]*)(' + search.trim() + ')([^<.]*)', 'gi');
	const replaceWith = '$1<span ' + (className ? 'class="' + className + '"' : '') + '">$2</span>$3';
	return text.replace(pattern, replaceWith);
}
