import Settings from './settings';
import Store, { DataArray, Option } from './store';
export interface Callbacks {
    open: () => void;
    close: () => void;
    addSelected: (value: string) => void;
    setSelected: (value: string[]) => void;
    addOption: (option: Option) => void;
    search: (search: string) => void;
    beforeChange?: (before: DataArray, after: DataArray) => boolean;
    beforeDelete?: (before: DataArray, after: DataArray) => boolean;
    deleteByID: (id: string) => void;
}
export interface SingleSelected {
    container: HTMLDivElement;
    placeholder: HTMLSpanElement;
    deselect: HTMLSpanElement;
    arrowIcon: {
        container: HTMLSpanElement;
        arrow: HTMLSpanElement;
    };
}
export interface MultiSelected {
    container: HTMLDivElement;
    values: HTMLDivElement;
    add: HTMLDivElement;
    plus: HTMLSpanElement;
}
export interface Search {
    container: HTMLDivElement;
    input: HTMLInputElement;
    addable?: HTMLDivElement;
}
export default class Slim {
    settings: Settings;
    store: Store;
    callbacks: Callbacks;
    main: HTMLDivElement;
    singleSelected: SingleSelected | null;
    multiSelected: MultiSelected | null;
    content: HTMLDivElement;
    search: Search;
    list: HTMLDivElement;
    classes: {
        main: string;
        singleSelected: string;
        multiSelected: string;
        arrow: string;
        add: string;
        plus: string;
        values: string;
        value: string;
        valueText: string;
        valueDelete: string;
        content: string;
        open: string;
        openAbove: string;
        openBelow: string;
        search: string;
        searchHighlighter: string;
        addable: string;
        list: string;
        optgroup: string;
        optgroupLabel: string;
        optgroupLabelSelectable: string;
        option: string;
        optionSelected: string;
        highlighted: string;
        disabled: string;
        hide: string;
    };
    constructor(settings: Required<Settings>, store: Store, callbacks: Callbacks);
    mainDiv(): HTMLDivElement;
    singleSelectedDiv(): SingleSelected;
    multiSelectedDiv(): MultiSelected;
    contentDiv(): HTMLDivElement;
    searchDiv(): Search;
    highlightUp(): void;
    highlightDown(): void;
    listDiv(): HTMLDivElement;
    values(): void;
    valueDiv(option: Option): HTMLDivElement;
    options(content?: string): void;
    option(option: Option): HTMLDivElement;
    enable(): void;
    disable(): void;
    moveContentAbove(): void;
    moveContentBelow(): void;
}
