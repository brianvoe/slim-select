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
    placeholder?: string;
    class?: string;
    style?: string;
    data?: {
        [key: string]: string;
    };
    mandatory?: boolean;
}
export declare class Option {
    id: string;
    value: string;
    text: string;
    html: string;
    selected: boolean;
    display: boolean;
    disabled: boolean;
    placeholder: string;
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
    setData(data: DataArray | DataArrayPartial): void;
    getData(): DataArray;
    getDataOptions(): Option[];
    setSelectedBy(selectedType: 'id' | 'value', selectedVals: string[]): void;
    getSelected(): DataArray;
    getSelectedOptions(): Option[];
    getSelectedIDs(): string[];
    getOptionByID(id: string): Option | null;
    search(search: string, searchFilter?: (opt: Option, search: string) => boolean): DataArray;
    filter(filter: {
        (opt: Option): boolean;
    } | null, includeOptgroup: boolean): DataArray;
}
