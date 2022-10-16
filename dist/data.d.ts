import SlimSelect from './index';
export interface DataConstructor {
    main: SlimSelect;
}
export declare type DataArray = DataObject[];
export declare type DataObject = Optgroup | Option;
export interface Optgroup {
    label: string;
    options?: Option[];
}
export interface Option {
    id?: string;
    value?: string;
    text: string;
    innerHTML?: string;
    selected?: boolean;
    display?: boolean;
    disabled?: boolean;
    placeholder?: boolean | string;
    class?: string;
    style?: string;
    data?: object;
    mandatory?: boolean;
}
export declare class Data {
    main: SlimSelect;
    searchValue: string;
    data: DataObject[];
    filtered: DataObject[] | null;
    contentOpen: boolean;
    contentPosition: string;
    isOnChangeEnabled: boolean;
    constructor(info: DataConstructor);
    newOption(info: any): Option;
    add(data: Option): void;
    parseSelectData(): void;
    pullOptionData(option: HTMLOptionElement): Option;
    setSelectedFromSelect(): void;
    setSelected(value: string | string[], type?: string): void;
    shouldBeSelected(option: Option, value: string | string[], type?: string): boolean;
    getSelected(): Option | Option[];
    addToSelected(value: string, type?: string): void;
    removeFromSelected(value: string, type?: string): void;
    onDataChange(): void;
    getObjectFromData(value: string, type?: string): Option | null;
    search(search: string): void;
}
export declare function validateData(data: DataArray): boolean;
export declare function validateOption(option: Option): boolean;
