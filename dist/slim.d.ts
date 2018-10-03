import SlimSelect from './index';
import { option } from './data';
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
    addable?: HTMLDivElement;
}
export default class Slim {
    main: SlimSelect;
    container: HTMLDivElement;
    singleSelected: singleSelected | null;
    multiSelected: multiSelected | null;
    content: HTMLDivElement;
    search: search;
    list: HTMLDivElement;
    constructor(info: {
        main: SlimSelect;
    });
    containerDiv(): HTMLDivElement;
    updateContainerDivClass(container: HTMLDivElement): void;
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
    option(data: option): HTMLDivElement;
}
export {};
