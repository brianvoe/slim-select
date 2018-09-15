import SlimSelect from './index';
interface constructor {
    main: SlimSelect;
}
export declare type dataArray = dataObject[];
export declare type dataObject = optgroup | option;
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
    data: {
        [attr: string]: string;
    };
    [key: string]: string | boolean | any;
}
export default class data {
    main: SlimSelect;
    searchValue: string;
    data: dataObject[];
    filtered: dataObject[];
    contentOpen: boolean;
    contentPosition: string;
    isOnChangeEnabled: boolean;
    constructor(info: constructor);
    getObjectFromData(value: string, type?: string): option;
    getSelected(): option | option[];
    removeFromSelected(value: string, type?: string): void;
    onDataChange(): void;
    newOption(info: any): option;
    addToSelected(value: string, type?: string): void;
    setSelected(value: string | string[], type?: string): void;
    parseSelectData(): void;
    setSelectedFromSelect(): void;
    add(opt: option): void;
    search(search: string): void;
    private pullOptionData;
    private shouldBeSelected;
}
export declare function validateData(da: dataArray): boolean;
export declare function validateOption(opt: option): boolean;
export {};
