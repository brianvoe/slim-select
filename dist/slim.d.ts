import SlimSelect from './index';
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
export default class slim {
    container: HTMLDivElement;
    content: HTMLDivElement;
    search: search;
    multiSelected: multiSelected;
    singleSelected: singleSelected;
    list: HTMLDivElement;
    private main;
    constructor(info: {
        main: SlimSelect;
    });
    options(content?: string): void;
    values(): void;
    placeholder(): void;
    deselect(): void;
    private containerDiv;
    private singleSelectedDiv;
    private multiSelectedDiv;
    private valueDiv;
    private contentDiv;
    private searchDiv;
    private highlightUp;
    private highlightDown;
    private listDiv;
    private option;
}
export {};
