import SlimSelect from './index';

interface constructor { main: SlimSelect; }

export type dataArray = dataObject[];
export type dataObject = optgroup | option;
export interface optgroup {
	label: string;
	options: option[];
}

export interface option {
	id: string;
	value: string;
	text: string;
	innerHTML: string;
	selected: boolean;
	display?: boolean;
	disabled: boolean;
	placeholder: string;
	data: { [attr: string]: string; };
	[key: string]: string | boolean | any;
}

// Class is responsible for managing the data
export default class data {
	public main: SlimSelect;
	public searchValue: string;
	public data: dataObject[];
	public filtered: dataObject[];
	public contentOpen: boolean = false;
	public contentPosition: string = 'below';
	public isOnChangeEnabled: boolean = true;
	constructor(info: constructor) {
		this.main = info.main;
		this.searchValue = '';
		this.data = [];
		this.filtered = null;

		this.parseSelectData();
		this.setSelectedFromSelect();
	}


	// Take in a value loop through the data till you find it and return it
	public getObjectFromData(value: string, type = 'id') {
		for (let i = 0; i < this.data.length; i++) {
			// If option check if value is the same
			if (type in this.data[i] && String((this.data[i] as option)[type]) === String(value)) {
				return this.data[i] as option;
			}
			// If optgroup loop through options
			if (this.data[i].hasOwnProperty('options')) {
				const optgroupObject = this.data[i] as optgroup;
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
	public getSelected(): option | option[] {
		let value: option = null;
		const values = [] as option[];
		for (let i = 0; i < this.data.length; i++) {
			// Deal with optgroups
			if (this.data[i].hasOwnProperty('label')) {
				if (this.data[i].hasOwnProperty('options')) {
					const options = (this.data[i] as optgroup).options;
					for (let o = 0; o < options.length; o++) {
						if (options[o].selected) {
							// If single return option
							if (!this.main.config.isMultiple) {
								value = options[o];
							} else {
								// Push to multiple array
								values.push(options[o]);
							}
						}
					}
				}
			} else {
				// Push options to array
				if ((this.data[i] as option).selected) {
					// If single return option
					if (!this.main.config.isMultiple) {
						value = this.data[i] as option;
					} else {
						// Push to multiple array
						values.push(this.data[i] as option);
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
	public removeFromSelected(value: string, type = 'id') {
		if (this.main.config.isMultiple) {
			const values = [];
			const selected = this.getSelected() as option[];
			for (let i = 0; i < selected.length; i++) {
				if (String(selected[i][type]) !== String(value)) {
					values.push(selected[i][type]);
				}
			}

			this.setSelected(values, type);
		}
	}

	// Trigger onChange callback
	public onDataChange() {
		if (this.main.onChange && this.isOnChangeEnabled) {
			this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())));
		}
	}

	public newOption(info: any): option {
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
	public addToSelected(value: string, type = 'id') {
		if (this.main.config.isMultiple) {
			const values = [];
			const selected = this.getSelected() as option[];
			for (let i = 0; i < selected.length; i++) {
				values.push(selected[i][type]);
			}
			values.push(value);

			this.setSelected(values, type);
		}
	}

	// From value set the selected value
	public setSelected(value: string | string[], type = 'id'): void {
		// Loop through data and set selected values
		for (let i = 0; i < this.data.length; i++) {
			// Deal with optgroups
			if (this.data[i].hasOwnProperty('label')) {
				if (this.data[i].hasOwnProperty('options')) {
					const options = (this.data[i] as optgroup).options;
					for (let o = 0; o < options.length; o++) {
						options[o].selected = this.shouldBeSelected(options[o], value, type);
					}
				}
			} else {
				(this.data[i] as option).selected = this.shouldBeSelected((this.data[i] as option), value, type);
			}
		}
	}

	// From passed in select element pull optgroup and options into data
	public parseSelectData() {
		this.data = [];
		// Loop through nodes and create data
		const element: HTMLSelectElement = this.main.select.element;
		const nodes = element.childNodes;
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName === 'OPTGROUP') {
				const node = nodes[i] as HTMLOptGroupElement;
				const optgp = {
					label: node.label,
					options: []
				} as optgroup;
				const options = nodes[i].childNodes;
				for (let ii = 0; ii < options.length; ii++) {
					if (options[ii].nodeName === 'OPTION') {
						optgp.options.push(this.pullOptionData(options[ii] as HTMLOptionElement));
					}
				}
				this.data.push(optgp);
			} else if (nodes[i].nodeName === 'OPTION') {
				this.data.push(this.pullOptionData(nodes[i] as HTMLOptionElement));
			}
		}
	}

	// From select element get current selected and set selected
	public setSelectedFromSelect(): void {
		const options = this.main.select.element.options;
		if (this.main.config.isMultiple) {
			const newSelected = [];
			for (let i = 0; i < options.length; i++) {
				const opt = options[i] as HTMLOptionElement;
				if (opt.selected) {
					newSelected.push(this.getObjectFromData(opt.value, 'value').id);
				}
			}
			this.setSelected(newSelected, 'id');
		} else {
			// Single select element
			if (options.selectedIndex !== -1) {
				const opt = options[options.selectedIndex] as HTMLOptionElement;
				const value = opt.value;
				this.setSelected(value, 'value');
			}
		}
	}

	// Add to the current data array
	public add(opt: option) {
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
		} as option;

		this.data.push(obj);
	}

	// Take in search string and return filtered list of values
	public search(search: string) {
		this.searchValue = search;
		if (search.trim() === '') { this.filtered = null; return; }

		const valuesArray = this.data.slice(0);
		search = search.trim().toLowerCase();
		const filtered = valuesArray.map((obj) => {
			// If optgroup
			if (obj.hasOwnProperty('options')) {
				const optgroupObj = obj as optgroup;
				const options = optgroupObj.options.filter((opt) => {
					return opt.text.toLowerCase().indexOf(search) !== -1;
				});
				if (options.length !== 0) {
					const optgp = (Object as any).assign({}, optgroupObj); // Break pointer
					optgp.options = options;
					return optgp;
				}
			}

			// If single option
			if (obj.hasOwnProperty('text')) {
				const optionObj = obj as option;
				if (optionObj.text.toLowerCase().indexOf(search) !== -1) { return obj; }
			}

			return null;
		});

		// Filter out false values
		this.filtered = filtered.filter((info) => {
			return info;
		});
	}

	// From passed in option pull pieces of usable information
	private pullOptionData(opt: HTMLOptionElement): option {
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
	private shouldBeSelected(opt: option, value: string | string[], type = 'id'): boolean {
		if (Array.isArray(value)) {
			for (let i = 0; i < value.length; i++) {
				if (String(opt[type]) === String(value[i])) {
					return true;
				}
			}
		} else {
			if (String(opt[type]) === String(value)) {
				return true;
			}
		}

		return false;
	}
}

export function validateData(da: dataArray): boolean {
	if (!da) { console.error('Data must be an array of objects'); return; }
	let isValid = false;
	let errorCount = 0;

	for (let i = 0; i < da.length; i++) {
		if (da[i].hasOwnProperty('label')) {
			if (da[i].hasOwnProperty('options')) {
				const optgp = da[i] as optgroup;
				const options = optgp.options;
				for (let j = 0; j < options.length; j++) {
					isValid = validateOption(options[j]);
					if (!isValid) { errorCount++; }
				}
			}
		} else {
			const opt = da[i] as option;
			isValid = validateOption(opt);
			if (!isValid) { errorCount++; }
		}
	}

	return errorCount === 0;
}

export function validateOption(opt: option): boolean {
	if (opt.text === undefined) {
		console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(opt));
		return false;
	}
	return true;
}
