export declare class Option {
    id: string;
    value: string;
    text: string;
    html: string;
    defaultSelected: boolean;
    selected: boolean;
    display: boolean;
    disabled: boolean;
    placeholder: boolean;
    class: string;
    style: string;
    data: {
        [key: string]: string;
    };
    mandatory: boolean;
    constructor(option: Partial<Option>);
}
export declare class Optgroup {
    id: string;
    label: string;
    selectAll: boolean;
    selectAllText: string;
    closable: 'off' | 'open' | 'close';
    options: Partial<Option>[];
    constructor(optgroup: Partial<Optgroup>);
}
export default class Store {
    private selectType;
    private data;
    private selectedOrder;
    /** Baseline option list — restored when search is cleared (API results are temporary). */
    private catalog;
    constructor(type: 'single' | 'multiple', data: (Partial<Option> | Partial<Optgroup>)[]);
    validateDataArray(data: (Partial<Option> | Partial<Optgroup>)[]): Error | null;
    validateOption(option: Partial<Option>): Error | null;
    partialToFullData(data: (Partial<Option> | Partial<Optgroup>)[]): (Option | Optgroup)[];
    /** Snapshot the current data as the catalog baseline (not called for API search results). */
    snapshotCatalog(): void;
    /** Catalog baseline used when clearing search. */
    getCatalogData(): (Option | Optgroup)[];
    private cloneData;
    private optionMatchesSelected;
    private findOptionInData;
    setData(data: (Partial<Option> | Partial<Optgroup>)[], preserveSelected?: boolean): void;
    getData(): Option[] | Optgroup[];
    getDataOptions(): Option[];
    addOption(option: Partial<Option>, addToStart?: boolean): void;
    setSelectedBy(selectedType: 'id' | 'value', selectedValues: string[], allowEmptySelection?: boolean): void;
    getSelected(): string[];
    getSelectedValues(): string[];
    getSelectedOptions(): Option[];
    getOptgroupByID(id: string): Optgroup | null;
    getOptionByID(id: string): Option | null;
    getSelectType(): string;
    getFirstOption(): Option | null;
    search(search: string, searchFilter: (opt: Option, search: string) => boolean): (Option | Optgroup)[];
    filter(filter: {
        (opt: Option): boolean;
    } | null, includeOptgroup: boolean): (Option | Optgroup)[];
    selectedOrderOptions(options: Option[]): Option[];
}
