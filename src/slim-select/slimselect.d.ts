declare module "config" {
    interface constructor {
        select: HTMLSelectElement;
        isAjax: boolean;
        showSearch: boolean;
        searchPlaceholder: string;
        searchText: string;
        searchHighlight: boolean;
        closeOnSelect: boolean;
        showContent: string;
        placeholderText: string;
        allowDeselect: boolean;
        isEnabled: boolean;
        valuesUseText: boolean;
        showOptionTooltips: boolean;
    }
    export class config {
        id: string;
        style: string;
        class: DOMTokenList;
        isMultiple: boolean;
        isAjax: boolean;
        isSearching: boolean;
        showSearch: boolean;
        searchHighlight: boolean;
        closeOnSelect: boolean;
        showContent: string;
        searchPlaceholder: string;
        searchText: string;
        placeholderText: string;
        allowDeselect: boolean;
        isEnabled: boolean;
        valuesUseText: boolean;
        showOptionTooltips: boolean;
        readonly main: string;
        readonly singleSelected: string;
        readonly arrow: string;
        readonly multiSelected: string;
        readonly add: string;
        readonly plus: string;
        readonly values: string;
        readonly value: string;
        readonly valueText: string;
        readonly valueDelete: string;
        readonly content: string;
        readonly open: string;
        readonly openAbove: string;
        readonly openBelow: string;
        readonly search: string;
        readonly searchHighlighter: string;
        readonly addable: string;
        readonly list: string;
        readonly optgroup: string;
        readonly optgroupLabel: string;
        readonly option: string;
        readonly highlighted: string;
        readonly disabled: string;
        readonly hide: string;
        constructor(info: constructor);
    }
}
declare module "helper" {
    export function hasClassInTree(element: any, className: any): any;
    export function ensureElementInView(container: any, element: any): void;
    export function putContent(el: any, currentPosition: string, isOpen: boolean): string;
    export function debounce(func: any, wait?: number, immediate?: boolean): () => void;
    export function isValueInArrayOfObjects(selected: any, key: any, value: any): boolean;
    export function highlight(text: string, search: string, className: string): string;
}
declare module "select" {
    import SlimSelect from "index";
    import { dataArray } from "data";
    interface Constructor {
        select: HTMLSelectElement;
        main: SlimSelect;
    }
    export class select {
        element: HTMLSelectElement;
        main: SlimSelect;
        mutationObserver: MutationObserver | null;
        constructor(info: Constructor);
        setValue(): void;
        addAttributes(): void;
        addEventListeners(): void;
        addMutationObserver(): void;
        observeMutationObserver(): void;
        disconnectMutationObserver(): void;
        create(data: dataArray): void;
        createOption(info: any): HTMLOptionElement;
    }
}
declare module "slim" {
    import SlimSelect from "index";
    import { option } from "data";
    interface singleSelected {
        container: HTMLDivElement;
        placeholder: HTMLSpanElement;
        deselect: HTMLSpanElement;
        arrowIcon: {
            container: HTMLSpanElement;
            arrow: HTMLSpanElement;
        };
    }
    interface multiSelected {
        container: HTMLDivElement;
        values: HTMLDivElement;
        add: HTMLDivElement;
        plus: HTMLSpanElement;
    }
    interface search {
        container: HTMLDivElement;
        input: HTMLInputElement;
        addable: HTMLDivElement;
    }
    export class slim {
        main: SlimSelect;
        container: HTMLDivElement;
        singleSelected: singleSelected;
        multiSelected: multiSelected;
        content: HTMLDivElement;
        search: search;
        list: HTMLDivElement;
        constructor(info: {
            main: SlimSelect;
        });
        containerDiv(): HTMLDivElement;
        singleSelectedDiv(): singleSelected;
        placeholder(): void;
        deselect(): void;
        multiSelectedDiv(): multiSelected;
        values(): void;
        valueDiv(option: option): HTMLDivElement;
        contentDiv(): HTMLDivElement;
        searchDiv(): search;
        highlightUp(): void;
        highlightDown(): void;
        listDiv(): HTMLDivElement;
        options(content?: string): void;
        option(data: any): HTMLDivElement;
    }
}
declare module "index" {
    import 'custom-event-polyfill';
    import Config from "config";
    import Select from "select";
    import Data, { dataArray, option } from "data";
    import Slim from "slim";
    interface constructor {
        select: string | Element;
        data: dataArray;
        showSearch: boolean;
        searchPlaceholder: string;
        searchText: string;
        searchHighlight: boolean;
        closeOnSelect: boolean;
        showContent: string;
        placeholder: string;
        allowDeselect: boolean;
        isEnabled: boolean;
        valuesUseText: boolean;
        showOptionTooltips: boolean;
        ajax: Function;
        addable: Function;
        beforeOnChange: Function;
        onChange: Function;
        beforeOpen: Function;
        afterOpen: Function;
        beforeClose: Function;
        afterClose: Function;
    }
    class SlimSelect {
        config: Config;
        select: Select;
        data: Data;
        slim: Slim;
        ajax: Function;
        addable: Function;
        beforeOnChange: Function;
        onChange: Function;
        beforeOpen: Function;
        afterOpen: Function;
        beforeClose: Function;
        afterClose: Function;
        constructor(info: constructor);
        validate(info: constructor): void;
        selected(): string | string[];
        set(value: string | string[], type?: string, close?: boolean, render?: boolean): void;
        setSelected(value: string | string[], type?: string, close?: boolean, render?: boolean): void;
        setData(data: dataArray): void;
        addData(data: option): void;
        open(): void;
        close(): void;
        moveContentAbove(): void;
        moveContentBelow(): void;
        enable(): void;
        disable(): void;
        search(value: string): void;
        setSearchText(text: string): void;
        render(): void;
        destroy(id?: string | null): void;
    }
    export default SlimSelect;
}
declare module "data" {
    import SlimSelect from "index";
    interface constructor {
        main: SlimSelect;
    }
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
        data: object;
    }
    export class data {
        main: SlimSelect;
        searchValue: string;
        data: dataObject[];
        filtered: dataObject[];
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
        getObjectFromData(value: string, type?: string): option;
        search(search: string): void;
    }
    export function validateData(data: dataArray): boolean;
    export function validateOption(option: option): boolean;
}
