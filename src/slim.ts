import { optgroup, option, validateOption } from './data';
import { ensureElementInView, highlight, isValueInArrayOfObjects } from './helper';
import SlimSelect from './index';

interface singleSelected {
	container: HTMLDivElement;
	placeholder: HTMLSpanElement;
	deselect: HTMLSpanElement;
	arrowIcon: {
		container: HTMLSpanElement;
		arrow: HTMLSpanElement;
	};
}

interface multiSelected {
	container: HTMLDivElement;
	values: HTMLDivElement;
	add: HTMLDivElement;
	plus: HTMLSpanElement;
}

interface search {
	container: HTMLDivElement;
	input: HTMLInputElement;
	addable: HTMLDivElement;
}

// Class is responsible for creating all the elements
export default class slim {
	public container: HTMLDivElement;
	public content: HTMLDivElement;
	public search: search;
	public multiSelected: multiSelected;
	public singleSelected: singleSelected;
	public list: HTMLDivElement;
	private main: SlimSelect;
	constructor(info: { main: SlimSelect }) {
		this.main = info.main;

		// Create elements in order of appending
		this.container = this.containerDiv();
		this.content = this.contentDiv();
		this.search = this.searchDiv();
		this.list = this.listDiv();
		this.options();

		if (this.main.config.isMultiple) {
			this.multiSelected = this.multiSelectedDiv();
			this.container.appendChild(this.multiSelected.container);
		} else {
			this.singleSelected = this.singleSelectedDiv();
			this.container.appendChild(this.singleSelected.container);
		}
		this.container.appendChild(this.content);
		this.content.appendChild(this.search.container);
		this.content.appendChild(this.list);
	}

	// Loop through data || filtered data and build options and append to list container
	public options(content = '') {
		const data = this.main.data.filtered || this.main.data.data;

		// Clear out innerHtml
		this.list.innerHTML = '';

		// If content is being passed just use that text
		if (content !== '') {
			const searching = document.createElement('div');
			searching.classList.add(this.main.config.option);
			searching.classList.add(this.main.config.disabled);
			searching.innerHTML = content;
			this.list.appendChild(searching);
			return;
		}

		// If ajax and isSearching
		if (this.main.config.isAjax && this.main.config.isSearching) {
			const searching = document.createElement('div');
			searching.classList.add(this.main.config.option);
			searching.classList.add(this.main.config.disabled);
			searching.innerHTML = 'Searching...';
			this.list.appendChild(searching);
			return;
		}

		// If no results show no results text
		if (data.length === 0) {
			const noResults = document.createElement('div');
			noResults.classList.add(this.main.config.option);
			noResults.classList.add(this.main.config.disabled);
			noResults.innerHTML = this.main.config.searchText;
			this.list.appendChild(noResults);
			return;
		}

		// Append individual options to div container
		for (let i = 0; i < data.length; i++) {
			// Create optgroup
			if (data[i].hasOwnProperty('label')) {
				const item = data[i] as optgroup;
				const optgp = document.createElement('div');
				optgp.classList.add(this.main.config.optgroup);

				// Create label
				const optgroupLabel = document.createElement('div');
				optgroupLabel.classList.add(this.main.config.optgroupLabel);
				optgroupLabel.innerHTML = item.label;
				optgp.appendChild(optgroupLabel);

				const options = item.options;
				for (let ii = 0; ii < options.length; ii++) {
					optgp.appendChild(this.option(options[ii]));
				}
				this.list.appendChild(optgp);
			} else {
				this.list.appendChild(this.option(data[i] as option));
			}
		}
	}

	// Get selected values and append to multiSelected values container
	// and remove those who shouldnt exist
	public values() {
		if (!this.main.config.isMultiple) {
			return;
		}
		let currentNodes = this.multiSelected.values.childNodes;
		const selected = this.main.data.getSelected() as option[];

		// Remove nodes that shouldnt be there
		let exists = false;
		const nodesToRemove = [];
		for (let c = 0; c < currentNodes.length; c++) {
			exists = true;
			const node = currentNodes[c] as HTMLDivElement;
			for (let s = 0; s < selected.length; s++) {
				if (String(selected[s].id) === String(node.dataset.id)) {
					exists = false;
				}
			}

			if (exists) {
				nodesToRemove.push(node);
			}
		}

		for (let i = 0; i < nodesToRemove.length; i++) {
			nodesToRemove[i].classList.add('ss-out');
			this.multiSelected.values.removeChild(nodesToRemove[i]);
		}

		// Add values that dont currently exist
		currentNodes = this.multiSelected.values.childNodes;
		for (let s = 0; s < selected.length; s++) {
			exists = false;
			for (let c = 0; c < currentNodes.length; c++) {
				const node = currentNodes[c] as HTMLDivElement;
				if (String(selected[s].id) === String(node.dataset.id)) {
					exists = true;
				}
			}

			if (!exists) {
				if (currentNodes.length === 0) {
					this.multiSelected.values.appendChild(this.valueDiv(selected[s]));
				} else if (s === 0) {
					this.multiSelected.values.insertBefore(this.valueDiv(selected[s]), (currentNodes[s] as any));
				} else {
					(currentNodes[s - 1] as any).insertAdjacentElement('afterend', this.valueDiv(selected[s]));
				}
			}
		}

		// If there are no values set placeholder
		if (selected.length === 0) {
			const placeholder = document.createElement('span');
			placeholder.classList.add(this.main.config.disabled);
			placeholder.innerHTML = this.main.config.placeholderText;
			this.multiSelected.values.innerHTML = placeholder.outerHTML;
		}
	}

	// Based upon current selection set placeholder text
	public placeholder() {
		const selected = this.main.data.getSelected() as option;

		// Placeholder display
		if (selected === null || (selected && selected.placeholder)) {
			const placeholder = document.createElement('span');
			placeholder.classList.add(this.main.config.disabled);
			placeholder.innerHTML = this.main.config.placeholderText;
			this.singleSelected.placeholder.innerHTML = placeholder.outerHTML;
		} else {
			let selectedValue = '';
			if (selected) {
				selectedValue = selected.innerHTML && this.main.config.valuesUseText !== true ? selected.innerHTML : selected.text;
			}
			this.singleSelected.placeholder.innerHTML = (selected ? selectedValue : '');
		}
	}

	// Based upon current selection/settings hide/show deselect
	public deselect() {
		// if allowDeselect is false just hide it
		if (!this.main.config.allowDeselect) {
			this.singleSelected.deselect.classList.add('ss-hide');
			return;
		}

		if (this.main.selected() === '') {
			this.singleSelected.deselect.classList.add('ss-hide');
		} else {
			this.singleSelected.deselect.classList.remove('ss-hide');
		}
	}

	// Create main container
	private containerDiv() {
		// Create main container
		const container = document.createElement('div') as HTMLDivElement;
		container.classList.add(this.main.config.id);
		container.classList.add(this.main.config.main);

		// Add style and classes
		container.style.cssText = this.main.config.style;
		for (let i = 0; i < this.main.config.class.length; i++) {
			container.classList.add(this.main.config.class[i]);
		}

		return container;
	}

	private singleSelectedDiv() {
		const container: HTMLDivElement = document.createElement('div');
		container.classList.add(this.main.config.singleSelected);

		// Placeholder text
		const placeholder: HTMLSpanElement = document.createElement('span');
		placeholder.classList.add('placeholder');
		container.appendChild(placeholder);

		// Deselect
		let deselect: HTMLSpanElement = null;
		deselect = document.createElement('span');
		deselect.innerHTML = 'X';
		deselect.classList.add('ss-deselect');
		deselect.onclick = (e) => {
			this.main.set('');
			e.stopPropagation();
		};
		container.appendChild(deselect);

		// Arrow
		const arrowContainer: HTMLSpanElement = document.createElement('span');
		arrowContainer.classList.add(this.main.config.arrow);
		const arrowIcon = document.createElement('span');
		arrowIcon.classList.add('arrow-down');
		arrowContainer.appendChild(arrowIcon);
		container.appendChild(arrowContainer);

		// Add onclick for main selector div
		container.onclick = () => {
			if (!this.main.config.isEnabled) {
				return;
			}

			this.main.data.contentOpen ? this.main.close() : this.main.open();
		};

		return {
			arrowIcon: {
				arrow: arrowIcon,
				container: arrowContainer
			},
			container,
			deselect,
			placeholder
		} as singleSelected;
	}

	private multiSelectedDiv() {
		const container = document.createElement('div');
		container.classList.add(this.main.config.multiSelected);

		const values = document.createElement('div');
		values.classList.add(this.main.config.values);
		container.appendChild(values);

		const add = document.createElement('div');
		add.classList.add(this.main.config.add);
		const plus = document.createElement('span');
		plus.classList.add(this.main.config.plus);
		plus.onclick = (e) => {
			if (this.main.data.contentOpen) {
				this.main.close();
				e.stopPropagation();
			}
		};
		add.appendChild(plus);
		container.appendChild(add);

		container.onclick = (e) => {
			if (!this.main.config.isEnabled) {
				return;
			}

			// Open only if you are not clicking on x text
			const target = e.target as Element;
			if (!target.classList.contains(this.main.config.valueDelete)) {
				this.main.open();
			}
		};

		return {
			add,
			container,
			plus,
			values
		} as multiSelected;
	}

	private valueDiv(opt: option) {
		const value = document.createElement('div');
		value.classList.add(this.main.config.value);
		value.dataset.id = opt.id;

		const text = document.createElement('span');
		text.classList.add(this.main.config.valueText);
		text.innerHTML = (opt.innerHTML && this.main.config.valuesUseText !== true ? opt.innerHTML : opt.text);
		value.appendChild(text);

		const deleteSpan = document.createElement('span');
		deleteSpan.classList.add(this.main.config.valueDelete);
		deleteSpan.innerHTML = 'x';
		deleteSpan.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();

			if (!this.main.config.isEnabled) {
				return;
			}

			if (this.main.beforeOnChange) {
				const selected = this.main.data.getSelected() as option;
				const currentValues = JSON.parse(JSON.stringify(selected));

				// Remove from current selection
				for (let i = 0; i < currentValues.length; i++) {
					if (currentValues[i].id === opt.id) {
						currentValues.splice(i, 1);
					}
				}

				const beforeOnchange = this.main.beforeOnChange(currentValues);
				if (beforeOnchange !== false) {
					this.main.data.removeFromSelected(opt.id, 'id');
					this.main.render();
					this.main.select.setValue();
				}
			} else {
				this.main.data.removeFromSelected(opt.id, 'id');
				this.main.render();
				this.main.select.setValue();
				this.main.data.onDataChange(); // Trigger on change callback
			}
		};
		value.appendChild(deleteSpan);

		return value;
	}

	// Create content container
	private contentDiv() {
		const container = document.createElement('div');
		container.classList.add(this.main.config.content);
		return container;
	}

	private searchDiv() {
		const container = document.createElement('div');
		const input = document.createElement('input');
		container.classList.add(this.main.config.search);

		// We still want the search to be tabable but not shown
		if (!this.main.config.showSearch) {
			container.classList.add(this.main.config.hide);
			input.readOnly = true;
		}

		input.type = 'search';
		input.placeholder = this.main.config.searchPlaceholder;
		input.tabIndex = 0;
		input.onclick = (e) => {
			setTimeout(() => {
				const target = e.target as HTMLInputElement;
				if (target.value === '') {
					this.main.search('');
				}
			}, 10);
		};
		input.onkeydown = (e) => {
			if (e.key === 'ArrowUp') {
				this.main.open();
				this.highlightUp();
				e.preventDefault();
			} else if (e.key === 'ArrowDown') {
				this.main.open();
				this.highlightDown();
				e.preventDefault();
			} else if (e.key === 'Tab') {
				this.main.close();
			} else if (e.key === 'Enter') {
				e.preventDefault();
			}
		};
		input.onkeyup = (e) => {
			const target = e.target as HTMLInputElement;
			if (e.key === 'Enter') {
				if (this.main.addable && e.ctrlKey) {
					addable.click();
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				const highlighted = this.list.querySelector('.' + this.main.config.highlighted) as HTMLDivElement;
				if (highlighted) { highlighted.click(); }
			} else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				// Cancel out to leave for onkeydown to handle
			} else if (e.key === 'Escape') {
				this.main.close();
			} else {
				if (this.main.config.showSearch && this.main.data.contentOpen) {
					this.main.search(target.value);
				} else {
					input.value = '';
				}
			}
			e.preventDefault();
			e.stopPropagation();
		};
		input.onfocus = () => { this.main.open(); };
		container.appendChild(input);

		let addable: HTMLDivElement;
		if (this.main.addable) {
			addable = document.createElement('div');
			addable.classList.add(this.main.config.addable);
			addable.innerHTML = '+';
			addable.onclick = (e) => {
				e.preventDefault();
				e.stopPropagation();

				const inputValue = this.search.input.value;
				if (inputValue.trim() === '') { this.search.input.focus(); return; }

				const addableValue = this.main.addable(inputValue);
				let addableValueStr = '';
				if (!addableValue) { return; }

				if (typeof addableValue === 'object') {
					const validValue = validateOption(addableValue);
					if (validValue) {
						this.main.addData(addableValue);
						addableValueStr = (addableValue.value ? addableValue.value : addableValue.text);
					}
				} else {
					this.main.addData(this.main.data.newOption({
						text: addableValue,
						value: addableValue
					}));
					addableValueStr = addableValue;
				}

				this.main.search('');
				setTimeout(() => { // Temp fix to solve multi render issue
					this.main.set(addableValueStr, 'value', false, false);
				}, 100);

				// Close it only if closeOnSelect = true
				if (this.main.config.closeOnSelect) {
					setTimeout(() => { // Give it a little padding for a better looking animation
						this.main.close();
					}, 100);
				}
			};
			container.appendChild(addable);
		}

		return {
			addable,
			container,
			input
		} as search;
	}

	private highlightUp() {
		const highlighted = this.list.querySelector('.' + this.main.config.highlighted) as HTMLDivElement;
		let prev = null;
		if (highlighted) {
			prev = highlighted.previousSibling as HTMLDivElement;
			while (prev !== null) {
				if (prev.classList.contains(this.main.config.disabled)) {
					prev = prev.previousSibling as HTMLDivElement;
					continue;
				} else {
					break;
				}
			}
		} else {
			const allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
			prev = allOptions[allOptions.length - 1] as HTMLElement;
		}

		// Do not select if optgroup label
		if (prev && prev.classList.contains(this.main.config.optgroupLabel)) { prev = null; }

		// Check if parent is optgroup
		if (prev === null) {
			const parent = highlighted.parentNode as HTMLDivElement;
			if (parent.classList.contains(this.main.config.optgroup)) {
				if (parent.previousSibling) {
					const prevNodes = (parent.previousSibling as HTMLDivElement).querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')');
					if (prevNodes.length) {
						prev = prevNodes[prevNodes.length - 1] as HTMLElement;
					}
				}
			}
		}

		// If previous element exists highlight it
		if (prev) {
			if (highlighted) { highlighted.classList.remove(this.main.config.highlighted); }
			prev.classList.add(this.main.config.highlighted);
			ensureElementInView(this.list, prev);
		}
	}

	private highlightDown() {
		const highlighted = this.list.querySelector('.' + this.main.config.highlighted) as HTMLDivElement;
		let next = null;

		if (highlighted) {
			next = highlighted.nextSibling as HTMLDivElement;
			while (next !== null) {
				if (next.classList.contains(this.main.config.disabled)) {
					next = next.nextSibling as HTMLDivElement;
					continue;
				} else {
					break;
				}
			}
		} else {
			next = this.list.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')') as HTMLDivElement;
		}

		// Check if parent is optgroup
		if (next === null && highlighted !== null) {
			const parent = highlighted.parentNode as HTMLDivElement;
			if (parent.classList.contains(this.main.config.optgroup)) {
				if (parent.nextSibling) {
					const sibling = parent.nextSibling as HTMLDivElement;
					next = sibling.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')') as HTMLDivElement;
				}
			}
		}

		// If previous element exists highlight it
		if (next) {
			if (highlighted) { highlighted.classList.remove(this.main.config.highlighted); }
			next.classList.add(this.main.config.highlighted);
			ensureElementInView(this.list, next);
		}
	}

	// Create main container that options will reside
	private listDiv() {
		const list = document.createElement('div');
		list.classList.add(this.main.config.list);
		list.onmousewheel = (e) => {
			const scrollTop = list.scrollTop;
			const scrollHeight = list.scrollHeight;
			const height = list.offsetHeight;
			const delta = (e.type === 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta);
			const up = delta > 0;

			const prevent = () => {
				e.stopPropagation();
				e.preventDefault();
				e.returnValue = false;
				return false;
			};

			if (!up && -delta > scrollHeight - height - scrollTop) {
				// Scrolling down, but this will take us past the bottom.
				list.scrollTop = scrollHeight;
				return prevent();
			} else if (up && delta > scrollTop) {
				// Scrolling up, but this will take us past the top.
				list.scrollTop = 0;
				return prevent();
			}
		};

		return list;
	}

	// Create single option
	private option(data: option) {
		// Add hidden placeholder
		if (data.placeholder) {
			const placeholder = document.createElement('div');
			placeholder.classList.add(this.main.config.option);
			placeholder.classList.add(this.main.config.hide);
			return placeholder;
		}

		const opt = document.createElement('div');
		opt.classList.add(this.main.config.option);

		const selected = this.main.data.getSelected() as option;

		opt.dataset.id = data.id;
		if (this.main.config.searchHighlight && this.main.slim && this.main.slim.search.input.value.trim() !== '') {
			opt.innerHTML = highlight(data.innerHTML, this.main.slim.search.input.value, this.main.config.searchHighlighter);
		} else {
			opt.innerHTML = data.innerHTML;
		}
		if (this.main.config.showOptionTooltips) {
			opt.setAttribute('title', opt.textContent);
		}
		const master = this;
		opt.onclick = function (e) {
			e.preventDefault();
			e.stopPropagation();

			const element = this;
			const elementID = element.dataset.id;
			if (master.main.beforeOnChange) {
				let value;
				const objectInfo = JSON.parse(JSON.stringify(master.main.data.getObjectFromData(elementID)));
				objectInfo.selected = true;

				if (master.main.config.isMultiple) {
					value = JSON.parse(JSON.stringify(selected));
					value.push(objectInfo);
				} else {
					value = JSON.parse(JSON.stringify(objectInfo));
				}

				const beforeOnchange = master.main.beforeOnChange(value);
				if (beforeOnchange !== false) {
					master.main.set(elementID, 'id', master.main.config.closeOnSelect);
				}
			} else {
				master.main.set(elementID, 'id', master.main.config.closeOnSelect);
			}
		};

		if (data.disabled || (selected && isValueInArrayOfObjects(selected, 'id', data.id))) {
			opt.onclick = null;
			opt.classList.add(this.main.config.disabled);
		}

		return opt;
	}
}
