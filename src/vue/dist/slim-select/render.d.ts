import Settings from './settings';
import Store, { DataArray, Option, OptionOptional } from './store';
export interface Callbacks {
    open: () => void;
    close: () => void;
    addable?: (value: string) => Promise<OptionOptional | string> | OptionOptional | string | false | undefined | null;
    setSelected: (value: string | string[], runAfterChange: boolean) => void;
    addOption: (option: Option) => void;
    search: (search: string) => void;
    beforeChange?: (newVal: Option[], oldVal: Option[]) => boolean | void;
    afterChange?: (newVal: Option[]) => void;
}
export interface Main {
    main: HTMLDivElement;
    values: HTMLDivElement;
    deselect: {
        main: HTMLDivElement;
        svg: SVGSVGElement;
        path: SVGPathElement;
    };
    arrow: {
        main: SVGSVGElement;
        path: SVGPathElement;
    };
}
export interface Content {
    main: HTMLDivElement;
    search: Search;
    list: HTMLDivElement;
}
export interface Search {
    main: HTMLDivElement;
    input: HTMLInputElement;
    addable?: {
        main: HTMLDivElement;
        svg: SVGSVGElement;
        path: SVGPathElement;
    };
}
export default class Render {
    settings: Settings;
    store: Store;
    callbacks: Callbacks;
    main: Main;
    content: Content;
    classes: {
        main: string;
        placeholder: string;
        values: string;
        single: string;
        max: string;
        value: string;
        valueText: string;
        valueDelete: string;
        valueOut: string;
        deselect: string;
        deselectPath: string;
        arrow: string;
        arrowClose: string;
        arrowOpen: string;
        content: string;
        openAbove: string;
        openBelow: string;
        search: string;
        searchHighlighter: string;
        searching: string;
        addable: string;
        addablePath: string;
        list: string;
        optgroup: string;
        optgroupLabel: string;
        optgroupLabelText: string;
        optgroupActions: string;
        optgroupSelectAll: string;
        optgroupSelectAllBox: string;
        optgroupSelectAllCheck: string;
        optgroupClosable: string;
        option: string;
        optionDelete: string;
        highlighted: string;
        open: string;
        close: string;
        selected: string;
        error: string;
        disabled: string;
        hide: string;
    };
    constructor(settings: Required<Settings>, store: Store, callbacks: Callbacks);
    enable(): void;
    disable(): void;
    open(): void;
    close(): void;
    updateClassStyles(): void;
    updateAriaAttributes(): void;
    mainDiv(): Main;
    mainFocus(eventType: string | null): void;
    placeholder(): HTMLDivElement;
    renderValues(): void;
    private renderSingleValue;
    private renderMultipleValues;
    multipleValue(option: Option): HTMLDivElement;
    contentDiv(): Content;
    moveContent(): void;
    searchDiv(): Search;
    searchFocus(): void;
    getOptions(notPlaceholder?: boolean, notDisabled?: boolean, notHidden?: boolean): HTMLDivElement[];
    highlight(dir: 'up' | 'down'): void;
    listDiv(): HTMLDivElement;
    renderError(error: string): void;
    renderSearching(): void;
    renderOptions(data: DataArray): void;
    option(option: Option): HTMLDivElement;
    destroy(): void;
    private highlightText;
    moveContentAbove(): void;
    moveContentBelow(): void;
    ensureElementInView(container: HTMLElement, element: HTMLElement): void;
    putContent(): 'up' | 'down';
    updateDeselectAll(): void;
}
