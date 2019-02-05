import SlimSelect from './index';
import { Option } from './data';
interface SingleSelected {
    container: HTMLDivElement;
    placeholder: HTMLSpanElement;
    deselect: HTMLSpanElement;
    arrowIcon: {
        container: HTMLSpanElement;
        arrow: HTMLSpanElement;
    };
}
interface MultiSelected {
    container: HTMLDivElement;
    values: HTMLDivElement;
    add: HTMLDivElement;
    plus: HTMLSpanElement;
}
interface Search {
    container: HTMLDivElement;
    input: HTMLInputElement;
    addable?: HTMLDivElement;
}
export declare class Slim {
    main: SlimSelect;
    container: HTMLDivElement;
    singleSelected: SingleSelected | null;
    multiSelected: MultiSelected | null;
    content: HTMLDivElement;
    search: Search;
    list: HTMLDivElement;
    constructor(info: {
        main: SlimSelect;
    });
    containerDiv(): HTMLDivElement;
    updateContainerDivClass(container: HTMLDivElement): void;
    singleSelectedDiv(): SingleSelected;
    placeholder(): void;
    deselect(): void;
    multiSelectedDiv(): MultiSelected;
    values(): void;
    valueDiv(optionObj: Option): HTMLDivElement;
    contentDiv(): HTMLDivElement;
    searchDiv(): Search;
    highlightUp(): void;
    highlightDown(): void;
    listDiv(): HTMLDivElement;
    options(content?: string): void;
    option(data: Option): HTMLDivElement;
}
export {};
