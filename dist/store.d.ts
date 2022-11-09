export declare type DataArray = DataObject[];
export declare type DataObject = Optgroup | Option;
export declare type DataArrayPartial = DataObjectPartial[];
export declare type DataObjectPartial = OptgroupOptional | OptionOptional;
export interface OptgroupOptional {
    id?: string;
    label: string;
    options?: OptionOptional[];
}
export declare class Optgroup {
    id: string;
    label: string;
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
    private data;
    constructor(data: DataArrayPartial);
    partialToFullData(data: DataArrayPartial): DataArray;
    setData(data: DataArray | DataArrayPartial): void;
    getData(): DataArray;
    getDataOptions(): Option[];
    addOption(option: OptionOptional): void;
    setSelectedBy(selectedType: 'id' | 'value', selectedVals: string[]): void;
    getSelected(): DataArray;
    getSelectedOptions(): Option[];
    getSelectedIDs(): string[];
    getSelectedValues(): string[];
    getOptionByID(id: string): Option | null;
    search(search: string, searchFilter?: (opt: Option, search: string) => boolean): DataArray;
    filter(filter: {
        (opt: Option): boolean;
    } | null, includeOptgroup: boolean): DataArray;
}
