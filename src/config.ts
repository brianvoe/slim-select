interface constructor {
	select: HTMLSelectElement;
	isAjax: boolean;
	showSearch: boolean;
	searchPlaceholder: string;
	searchText: string;
	searchHighlight: boolean;
	closeOnSelect: boolean;
	showContent: 'auto' | 'up' | 'down';
	placeholderText: string;
	allowDeselect: boolean;
	isEnabled: boolean;
	valuesUseText: boolean;
	showOptionTooltips: boolean;
}

export default class config {
	public isMultiple = false;
	public id: string = '';
	public style: string;
	public class: DOMTokenList;
	public isAjax = false;
	public isSearching = false;
	public showSearch = true;
	public searchHighlight = false;
	public closeOnSelect = true;
	public showContent: 'auto' | 'up' | 'down' = 'auto'; // options: auto, up, down
	public searchPlaceholder = 'Search';
	public searchText = 'No Results';
	public placeholderText = 'Select Value';
	public allowDeselect = false;
	public isEnabled = true;
	public valuesUseText = false;
	public showOptionTooltips = false;

	// Classes
	public readonly main = 'ss-main';
	public readonly singleSelected = 'ss-single-selected';
	public readonly arrow = 'ss-arrow';
	public readonly multiSelected = 'ss-multi-selected';
	public readonly add = 'ss-add';
	public readonly plus = 'ss-plus';
	public readonly values = 'ss-values';
	public readonly value = 'ss-value';
	public readonly valueText = 'ss-value-text';
	public readonly valueDelete = 'ss-value-delete';
	public readonly content = 'ss-content';
	public readonly open = 'ss-open';
	public readonly openAbove = 'ss-open-above';
	public readonly openBelow = 'ss-open-below';
	public readonly search = 'ss-search';
	public readonly searchHighlighter = 'ss-search-highlight';
	public readonly addable = 'ss-addable';
	public readonly list = 'ss-list';
	public readonly optgroup = 'ss-optgroup';
	public readonly optgroupLabel = 'ss-optgroup-label';
	public readonly option = 'ss-option';
	public readonly highlighted = 'ss-highlighted';
	public readonly disabled = 'ss-disabled';
	public readonly hide = 'ss-hide';

	constructor(info: constructor) {
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
