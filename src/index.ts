import Config from './config';
import Data, { dataArray, dataObject, option, validateData } from './data';
import { debounce, ensureElementInView, hasClassInTree, putContent } from './helper';
import Select from './select';
import Slim from './slim';

type Callback = (...args: any[]) => any;

interface Options {
	select: string | Element;
	data: dataArray;
	showSearch: boolean;
	searchPlaceholder: string;
	searchText: string;
	searchHighlight: boolean;
	closeOnSelect: boolean;
	showContent: 'auto' | 'up' | 'down';
	placeholder: string;
	allowDeselect: boolean;
	isEnabled: boolean;
	valuesUseText: boolean; // Use text value when showing selected value
	showOptionTooltips: boolean;

	// Events
	ajax: Callback;
	addable: Callback;
	beforeOnChange: Callback;
	onChange: Callback;
	beforeOpen: Callback;
	afterOpen: Callback;
	beforeClose: Callback;
	afterClose: Callback;
}

export class SlimSelect {
	public config: Config;
	public select: Select;
	public data: Data;
	public slim: Slim;
	public ajax: Callback = null;
	public addable: Callback = null;
	public beforeOnChange: Callback = null;
	public onChange: Callback = null;
	public beforeOpen: Callback = null;
	public afterOpen: Callback = null;
	public beforeClose: Callback = null;
	public afterClose: Callback = null;
	constructor(info: Partial<Options>) {
		this.validate(info);
		const selectElement = (typeof info.select === 'string' ? document.querySelector(info.select) as HTMLSelectElement : info.select) as HTMLSelectElement;

		// If select already has a slim select id on it lets destroy it first
		if (selectElement.dataset.ssid) { this.destroy(selectElement.dataset.ssid); }

		// Set ajax function if passed in
		if (info.ajax) { this.ajax = info.ajax; }

		// Add addable if option is passed in
		if (info.addable) { this.addable = info.addable; }

		this.config = new Config({
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

		this.select = new Select({
			main: this,
			select: selectElement
		});

		this.data = new Data({ main: this });
		this.slim = new Slim({ main: this });

		// Add after original select element
		this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling);

		// If data is passed in lets set it
		// and thus will start the render
		if (info.data) {
			this.setData(info.data);
		} else {
			// Do an initial render on startup
			this.render();
		}

		// Add onclick listener to document to closeContent if clicked outside
		document.addEventListener('click', (e: Event) => {
			if (!hasClassInTree(e.target as Element, this.config.id)) {
				this.close();
			}
		});

		window.addEventListener('scroll', debounce((e: Event) => {
			if (this.data.contentOpen && this.config.showContent === 'auto') {
				if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
					this.moveContentAbove();
				} else {
					this.moveContentBelow();
				}
			}
		}), false);

		// Add event callbacks after everthing has been created
		if (info.beforeOnChange) { this.beforeOnChange = info.beforeOnChange; }
		if (info.onChange) { this.onChange = info.onChange; }
		if (info.beforeOpen) { this.beforeOpen = info.beforeOpen; }
		if (info.afterOpen) { this.afterOpen = info.afterOpen; }
		if (info.beforeClose) { this.beforeClose = info.beforeClose; }
		if (info.afterClose) { this.afterClose = info.afterClose; }
	}

	public validate(info: Partial<Options>) {
		const select = (typeof info.select === 'string' ? document.querySelector(info.select) as HTMLSelectElement : info.select) as HTMLSelectElement;
		if (!select) { throw new Error('Could not find select element'); }
		if (select.tagName !== 'SELECT') { throw new Error('Element isnt of type select'); }
	}

	public selected(): string | string[] {
		if (this.config.isMultiple) {
			const selected = this.data.getSelected() as option[];
			const outputSelected = [];
			for (let i = 0; i < selected.length; i++) {
				outputSelected.push(selected[i].value);
			}
			return outputSelected;
		} else {
			const selected = this.data.getSelected() as option;
			return (selected ? selected.value : '');
		}
	}

	// Sets value of the select, adds it to data and original select
	public set(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
		if (this.config.isMultiple && !Array.isArray(value)) {
			this.data.addToSelected(value, type);
		} else {
			this.data.setSelected(value, type);
		}
		this.select.setValue();
		this.data.onDataChange(); // Trigger on change callback
		this.render();

		if (close) { this.close(); }
	}

	// setSelected is just mapped to the set method
	public setSelected(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
		this.set(value, type, close, render);
	}

	public setData(data: dataArray) {
		// Validate data if passed in
		const isValid = validateData(data);
		if (!isValid) { console.error('Validation problem on: #' + this.select.element.id); return; } // If data passed in is not valid DO NOT parse, set and render

		const newData = JSON.parse(JSON.stringify(data));
		const selected = this.data.getSelected();

		// If its an ajax type keep selected values
		if (this.config.isAjax && selected) {
			if (this.config.isMultiple) {
				const reverseSelected = (selected as option[]).reverse();
				for (let i = 0; i < reverseSelected.length; i++) {
					newData.unshift(reverseSelected[i]);
				}
			} else {
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
	public addData(data: option) {
		// Validate data if passed in
		const isValid = validateData([data]);
		if (!isValid) { console.error('Validation problem on: #' + this.select.element.id); return; } // If data passed in is not valid DO NOT parse, set and render

		const opt = this.data.newOption(data);
		this.data.add(opt);
		this.select.create(this.data.data);
		this.data.parseSelectData();
		this.data.setSelectedFromSelect();
		this.render();
	}

	// Open content section
	public open(): void {
		// Dont open if disabled
		if (!this.config.isEnabled) { return; }

		// Dont do anything if the content is already open
		if (this.data.contentOpen) { return; }

		// Focus on input field
		this.slim.search.input.focus();

		// Run beforeOpen callback
		if (this.beforeOpen) { this.beforeOpen(); }

		if (this.config.isMultiple) {
			this.slim.multiSelected.plus.classList.add('ss-cross');
		} else {
			this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down');
			this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up');
		}
		this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove : this.config.openBelow));
		this.slim.content.classList.add(this.config.open);

		// Check showContent to see if they want to specifically show in a certain direction
		if (this.config.showContent.toLowerCase() === 'up') {
			this.moveContentAbove();
		} else if (this.config.showContent.toLowerCase() === 'down') {
			this.moveContentBelow();
		} else {
			// Auto identify where to put it
			if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
				this.moveContentAbove();
			} else {
				this.moveContentBelow();
			}
		}


		// Move to selected option for single option
		if (!this.config.isMultiple) {
			const selected = this.data.getSelected() as option;
			if (selected) {
				const selectedId = selected.id;
				const selectedOption = this.slim.list.querySelector<HTMLOptionElement>('[data-id="' + selectedId + '"]');
				if (selectedOption) {
					ensureElementInView(this.slim.list, selectedOption);
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
	public close(): void {
		// Dont do anything if the content is already closed
		if (!this.data.contentOpen) { return; }

		// Run beforeClose calback
		if (this.beforeClose) { this.beforeClose(); }

		// this.slim.search.input.blur() // Removed due to safari quirk
		if (this.config.isMultiple) {
			this.slim.multiSelected.container.classList.remove(this.config.openAbove);
			this.slim.multiSelected.container.classList.remove(this.config.openBelow);
			this.slim.multiSelected.plus.classList.remove('ss-cross');
		} else {
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
			if (this.afterClose) { this.afterClose(); }
		}, 300);
	}

	public moveContentAbove(): void {
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

	public moveContentBelow(): void {
		this.slim.content.removeAttribute('style');
		this.data.contentPosition = 'below';
		this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.remove(this.config.openAbove);
		this.slim[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add(this.config.openBelow);
	}

	// Set to enabled, remove disabled classes and removed disabled from original select
	public enable(): void {
		this.config.isEnabled = true;
		if (this.config.isMultiple) {
			this.slim.multiSelected.container.classList.remove(this.config.disabled);
		} else {
			this.slim.singleSelected.container.classList.remove(this.config.disabled);
		}

		// Disable original select but dont trigger observer
		this.select.disconnectMutationObserver();
		this.select.element.disabled = false;
		this.slim.search.input.disabled = false;
		this.select.observeMutationObserver();
	}

	// Set to disabled, add disabled classes and add disabled to original select
	public disable(): void {
		this.config.isEnabled = false;
		if (this.config.isMultiple) {
			this.slim.multiSelected.container.classList.add(this.config.disabled);
		} else {
			this.slim.singleSelected.container.classList.add(this.config.disabled);
		}

		// Enable original select but dont trigger observer
		this.select.disconnectMutationObserver();
		this.select.element.disabled = true;
		this.slim.search.input.disabled = true;
		this.select.observeMutationObserver();
	}

	// Take in string value and search current options
	public search(value: string): void {
		// Only filter data and rerender if value has changed
		if (this.data.searchValue !== value) {
			this.slim.search.input.value = value;
			if (this.config.isAjax) {
				if (value.trim() === '') {
					this.setData([]);
					this.data.search('');
					this.render();
				} else {
					const master = this;
					this.config.isSearching = true;
					this.render();
					this.ajax(value, (info: dataObject[] | string) => {
						// Only process if return callback is not false
						master.config.isSearching = false;
						if (Array.isArray(info)) {
							info.unshift({ text: '', placeholder: true } as any);
							master.setData(info);
							master.data.search(value);
							master.render();
						} else if (typeof info === 'string') {
							master.slim.options(info);
						} else {
							master.render();
						}
					});
				}
			} else {
				this.data.search(value);
				this.render();
			}
		}
	}

	public setSearchText(text: string): void {
		this.config.searchText = text;
	}

	public render(): void {
		if (this.config.isMultiple) {
			this.slim.values();
		} else {
			this.slim.placeholder();
			this.slim.deselect();
		}
		this.slim.options();
	}

	// Display original select again and remove slim
	public destroy(id: string = null): void {
		const slim = (id ? document.querySelector('.' + id) : this.slim.container);
		const select = (id ? document.querySelector(`[data-ssid=${id}]`) as HTMLSelectElement : this.select.element);
		// If there is no slim dont do anything
		if (!slim || !select) { return; }

		// Show original select
		select.style.display = null;
		delete select.dataset.ssid;

		// Remove slim from original select dropdown
		(this.select.element as any).slim = null;

		// Remove slim select
		if (slim.parentElement) {
			slim.parentElement.removeChild(slim);
		}
	}
}

export default SlimSelect;
