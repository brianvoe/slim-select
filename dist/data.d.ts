import SlimSelect from './index';
interface constructor {
    main: SlimSelect;
}
export declare type dataArray = dataObject[];
export declare type dataObject = optgroup | option;
export interface optgroup {
    label: string;
    options?: option[];
}
export interface option {
    id?: string;
    value?: string;
    text: string;
    innerHTML?: string;
    selected?: boolean;
    display?: boolean;
    disabled?: boolean;
    placeholder?: boolean;
    data?: object;
}
export default class Data {
    main: SlimSelect;
    searchValue: string;
    data: dataObject[];
    filtered: dataObject[] | null;
    contentOpen: boolean;
    contentPosition: string;
    isOnChangeEnabled: boolean;
    constructor(info: constructor);
    newOption(info: any): option;
    add(data: option): void;
    parseSelectData(): void;
    pullOptionData(option: HTMLOptionElement): option;
    setSelectedFromSelect(): void;
    setSelected(value: string | string[], type?: string): void;
    shouldBeSelected(option: option, value: string | string[], type?: string): boolean;
    getSelected(): option | option[];
    addToSelected(value: string, type?: string): void;
    removeFromSelected(value: string, type?: string): void;
    onDataChange(): void;
    getObjectFromData(value: string, type?: string): option | null;
    search(search: string): void;
}
export declare function validateData(data: dataArray): boolean;
export declare function validateOption(option: option): boolean;
export {};
