declare interface Callbacks {
    open: () => void;
    close: () => void;
    addable?: (value: string) => Promise<Partial<Option_2> | string> | Partial<Option_2> | string | false | undefined | null | Error;
    setSelected: (value: string | string[], runAfterChange: boolean) => void;
    addOption: (option: Option_2) => void;
    search: (search: string) => void;
    beforeChange?: (newVal: Option_2[], oldVal: Option_2[]) => boolean | void;
    afterChange?: (newVal: Option_2[]) => void;
}

export declare interface Config {
    select: string | Element;
    data?: (Partial<Option_2> | Partial<Optgroup>)[];
    settings?: Partial<Settings>;
    cssClasses?: Partial<CssClasses>;
    events?: Events;
}

export declare interface Content {
    main: HTMLDivElement;
    search: Search;
    list: HTMLDivElement;
}

declare class CssClasses {
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
    contentOpen: string;
    dirAbove: string;
    dirBelow: string;
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
    mainOpen: string;
    close: string;
    selected: string;
    error: string;
    disabled: string;
    hide: string;
    constructor(classes?: Partial<CssClasses>);
}

export declare interface Events {
    search?: (searchValue: string, currentData: (Option_2 | Optgroup)[]) => Promise<(Partial<Option_2> | Partial<Optgroup>)[]> | (Partial<Option_2> | Partial<Optgroup>)[];
    searchFilter?: (option: Option_2, search: string) => boolean;
    addable?: (value: string) => Promise<Partial<Option_2> | string> | Partial<Option_2> | string | false | null | undefined | Error;
    beforeChange?: (newVal: Option_2[], oldVal: Option_2[]) => boolean | void;
    afterChange?: (newVal: Option_2[]) => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    error?: (err: Error) => void;
}

export declare interface Main {
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

export declare class Optgroup {
    id: string;
    label: string;
    selectAll: boolean;
    selectAllText: string;
    closable: 'off' | 'open' | 'close';
    options: Partial<Option_2>[];
    constructor(optgroup: Partial<Optgroup>);
}

declare class Option_2 {
    id: string;
    value: string;
    text: string;
    html: string;
    defaultSelected: boolean;
    selected: boolean;
    display: boolean;
    disabled: boolean;
    placeholder: boolean;
    class: string;
    style: string;
    data: {
        [key: string]: string;
    };
    mandatory: boolean;
    constructor(option: Partial<Option_2>);
}
export { Option_2 as Option }

declare class Render {
    settings: Settings;
    store: Store;
    callbacks: Callbacks;
    private lastSelectedOption;
    main: Main;
    content: Content;
    classes: CssClasses;
    constructor(settings: Required<Settings>, classes: Required<CssClasses>, store: Store, callbacks: Callbacks);
    enable(): void;
    disable(): void;
    open(): void;
    close(): void;
    private getAnimationTiming;
    updateClassStyles(): void;
    updateAriaAttributes(): void;
    mainDiv(): Main;
    mainFocus(eventType: string | null): void;
    placeholder(): HTMLDivElement;
    renderValues(): void;
    private renderSingleValue;
    private renderMultipleValues;
    multipleValue(option: Option_2): HTMLDivElement;
    contentDiv(): Content;
    moveContent(): void;
    searchDiv(): Search;
    searchFocus(): void;
    getOptions(notPlaceholder?: boolean, notDisabled?: boolean, notHidden?: boolean): HTMLDivElement[];
    highlight(dir: 'up' | 'down'): void;
    listDiv(): HTMLDivElement;
    renderError(error: string): void;
    renderSearching(): void;
    renderOptions(data: (Option_2 | Optgroup)[]): void;
    option(option: Option_2): HTMLDivElement;
    destroy(): void;
    private highlightText;
    moveContentAbove(): void;
    moveContentBelow(): void;
    ensureElementInView(container: HTMLElement, element: HTMLElement): void;
    putContent(): 'up' | 'down';
    updateDeselectAll(): void;
}

export declare interface Search {
    main: HTMLDivElement;
    input: HTMLInputElement;
    addable?: {
        main: HTMLDivElement;
        svg: SVGSVGElement;
        path: SVGPathElement;
    };
}

declare class Select {
    select: HTMLSelectElement;
    onValueChange?: (value: Option_2[]) => void;
    onClassChange?: (classes: string[]) => void;
    onDisabledChange?: (disabled: boolean) => void;
    onOptionsChange?: (data: (Option_2 | Optgroup)[]) => void;
    onLabelClick?: () => void;
    private listen;
    private observer;
    private isUpdating;
    private pendingOptionsChange;
    private preventNativeSelect;
    private preventNativeSelectMousedown;
    private preventNativeSelectFocus;
    constructor(select: HTMLSelectElement);
    enable(): void;
    disable(): void;
    hideUI(): void;
    showUI(): void;
    changeListen(listen: boolean): void;
    valueChange(ev: Event): boolean;
    private observeCall;
    getData(): (Option_2 | Optgroup)[];
    getDataFromOptgroup(optgroup: HTMLOptGroupElement): Optgroup;
    getDataFromOption(option: HTMLOptionElement): Option_2;
    getSelectedOptions(): Option_2[];
    getSelectedValues(): string[];
    setSelected(ids: string[]): void;
    setSelectedByValue(values: string[]): void;
    updateSelect(id?: string, style?: string, classes?: string[]): void;
    updateOptions(data: (Option_2 | Optgroup)[]): void;
    createOptgroup(optgroup: Optgroup): HTMLOptGroupElement;
    createOption(info: Option_2): HTMLOptionElement;
    setupLabelHandlers(): void;
    removeLabelHandlers(): void;
    destroy(): void;
}

export declare class Settings {
    id: string;
    style: string;
    class: string[];
    isMultiple: boolean;
    isOpen: boolean;
    isFullOpen: boolean;
    intervalMove: ReturnType<typeof setInterval> | null;
    disabled: boolean;
    alwaysOpen: boolean;
    showSearch: boolean;
    focusSearch: boolean;
    keepSearch: boolean;
    ariaLabel: string;
    searchPlaceholder: string;
    searchText: string;
    searchingText: string;
    searchHighlight: boolean;
    closeOnSelect: boolean;
    contentLocation: HTMLElement | null;
    contentPosition: 'relative' | 'absolute' | 'fixed';
    openPosition: 'auto' | 'up' | 'down';
    placeholderText: string;
    allowDeselect: boolean;
    hideSelected: boolean;
    keepOrder: boolean;
    showOptionTooltips: boolean;
    minSelected: number;
    maxSelected: number;
    timeoutDelay: number;
    maxValuesShown: number;
    maxValuesMessage: string;
    addableText: string;
    constructor(settings?: Partial<Settings>);
}

declare class SlimSelect {
    selectEl: HTMLSelectElement;
    settings: Settings;
    cssClasses: CssClasses;
    select: Select;
    store: Store;
    render: Render;
    private openTimeout;
    private closeTimeout;
    events: Events;
    constructor(config: Config);
    enable(): void;
    disable(): void;
    getData(): Option_2[] | Optgroup[];
    setData(data: (Partial<Option_2> | Partial<Optgroup>)[]): void;
    getSelected(): string[];
    setSelected(values: string | string[], runAfterChange?: boolean): void;
    addOption(option: Partial<Option_2>): void;
    open(): void;
    close(eventType?: string | null): void;
    search(value: string): void;
    destroy(): void;
    private windowResize;
    private windowScroll;
    private documentClick;
    private windowVisibilityChange;
}
export default SlimSelect;

declare class Store {
    private selectType;
    private data;
    private selectedOrder;
    constructor(type: 'single' | 'multiple', data: (Partial<Option_2> | Partial<Optgroup>)[]);
    validateDataArray(data: (Partial<Option_2> | Partial<Optgroup>)[]): Error | null;
    validateOption(option: Partial<Option_2>): Error | null;
    partialToFullData(data: (Partial<Option_2> | Partial<Optgroup>)[]): (Option_2 | Optgroup)[];
    setData(data: (Partial<Option_2> | Partial<Optgroup>)[], preserveSelected?: boolean): void;
    getData(): Option_2[] | Optgroup[];
    getDataOptions(): Option_2[];
    addOption(option: Partial<Option_2>, addToStart?: boolean): void;
    setSelectedBy(selectedType: 'id' | 'value', selectedValues: string[]): void;
    getSelected(): string[];
    getSelectedValues(): string[];
    getSelectedOptions(): Option_2[];
    getOptgroupByID(id: string): Optgroup | null;
    getOptionByID(id: string): Option_2 | null;
    getSelectType(): string;
    getFirstOption(): Option_2 | null;
    search(search: string, searchFilter: (opt: Option_2, search: string) => boolean): (Option_2 | Optgroup)[];
    filter(filter: {
        (opt: Option_2): boolean;
    } | null, includeOptgroup: boolean): (Option_2 | Optgroup)[];
    selectedOrderOptions(options: Option_2[]): Option_2[];
}

export { }
