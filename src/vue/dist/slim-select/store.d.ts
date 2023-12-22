export type DataArray = DataObject[];
export type DataObject = Optgroup | Option;
export type DataArrayPartial = DataObjectPartial[];
export type DataObjectPartial = OptgroupOptional | OptionOptional;
type selectType = 'single' | 'multiple';
export interface OptgroupOptional {
    id?: string;
    label: string;
    selectAll?: boolean;
    selectAllText?: string;
    closable?: 'off' | 'open' | 'close';
    options?: OptionOptional[];
}
export declare class Optgroup {
    id: string;
    label: string;
    selectAll: boolean;
    selectAllText: string;
    closable: 'off' | 'open' | 'close';
    options: Option[];
    constructor(optgroup: OptgroupOptional);
}
export interface OptionOptional {
    id?: string;
    value?: string;
    text: string;
    html?: string;
    selected?: boolean;
    display?: boolean;
    disabled?: boolean;
    mandatory?: boolean;
    placeholder?: boolean;
    class?: string;
    style?: string;
    data?: {
        [key: string]: string;
    };
}
export declare class Option {
    id: string;
    value: string;
    text: string;
    html: string;
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
    constructor(option: OptionOptional);
}
export default class Store {
    private selectType;
    private data;
    constructor(type: selectType, data: DataArrayPartial);
    validateDataArray(data: DataArray | DataArrayPartial): Error | null;
    validateOption(option: Option | OptionOptional): Error | null;
    partialToFullData(data: DataArrayPartial): DataArray;
    setData(data: DataArray | DataArrayPartial): void;
    getData(): DataArray;
    getDataOptions(): Option[];
    addOption(option: OptionOptional): void;
    setSelectedBy(selectedType: 'id' | 'value', selectedValues: string[]): void;
    getSelected(): string[];
    getSelectedOptions(): Option[];
    getSelectedIDs(): string[];
    getOptgroupByID(id: string): Optgroup | null;
    getOptionByID(id: string): Option | null;
    getSelectType(): string;
    getFirstOption(): Option | null;
    search(search: string, searchFilter: (opt: Option, search: string) => boolean): DataArray;
    filter(filter: {
        (opt: Option): boolean;
    } | null, includeOptgroup: boolean): DataArray;
}
export {};
