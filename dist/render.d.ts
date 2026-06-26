import { default as Settings } from './settings';
import { default as Store, Optgroup, Option } from './store';
import { default as CssClasses } from './classes';
export interface Callbacks {
    open: () => void;
    close: () => void;
    addable?: (value: string) => Promise<Partial<Option> | string> | Partial<Option> | string | false | undefined | null | Error;
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
    status: HTMLDivElement;
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
export interface ModalElements {
    overlay: HTMLDivElement;
    dialog: HTMLDivElement;
    closeButton: HTMLButtonElement;
    title: HTMLDivElement | null;
}
export default class Render {
    settings: Settings;
    store: Store;
    callbacks: Callbacks;
    private lastSelectedOption;
    private lastRenderedOptions;
    private optionsListIsFullData;
    private lastSearchFilterTerm;
    main: Main;
    content: Content;
    classes: CssClasses;
    private positionObserver;
    private positionObserverRaf;
    private modalElements;
    private modalSessionActive;
    private bodyScrollLocked;
    private savedBodyOverflow;
    constructor(settings: Required<Settings>, classes: Required<CssClasses>, store: Store, callbacks: Callbacks);
    addClasses(element: HTMLElement | SVGElement, classValue: string): void;
    removeClasses(element: HTMLElement | SVGElement, classValue: string): void;
    enable(): void;
    disable(): void;
    open(): void;
    isModalViewActive(): boolean;
    private resolveModalView;
    private createModalElements;
    private showModal;
    private lockBodyScroll;
    private unlockBodyScroll;
    private restoreContentOffscreen;
    /** Tear down modal shell after close animation completes. */
    finalizeModalClose(): void;
    /** Used by Lifecycle — wait for .ss-content CSS transition before afterOpen/afterClose. */
    waitForAnimation(phase: 'open' | 'close', signal?: AbortSignal): Promise<void>;
    close(): void;
    /** Remove open-direction classes after close animation (lifecycle afterClose). */
    clearDirectionClasses(): void;
    updateClassStyles(): void;
    updateAriaAttributes(): void;
    mainDiv(): Main;
    mainFocus(eventType: string | null): void;
    placeholder(): HTMLDivElement;
    renderValues(): void;
    private renderSingleValue;
    private renderMultipleValues;
    private isAtMinSelected;
    private getMinimumSelectionIds;
    private updateMultipleValueDeleteVisibility;
    multipleValue(option: Option): HTMLDivElement;
    contentDiv(): Content;
    private announce;
    moveContent(): void;
    /** Track trigger/content layout changes and reposition the dropdown panel. */
    startPositionTracking(): void;
    stopPositionTracking(): void;
    private observePositionTargets;
    searchDiv(): Search;
    searchFocus(): void;
    getOptions(notPlaceholder?: boolean, notDisabled?: boolean, notHidden?: boolean): HTMLDivElement[];
    highlight(dir: 'up' | 'down'): void;
    listDiv(): HTMLDivElement;
    renderError(error: string): void;
    renderSearching(): void;
    renderOptions(data: (Option | Optgroup)[]): void;
    /** True when the list DOM contains every store option (local search can show/hide in place). */
    canFilterOptionsInPlace(): boolean;
    resetSearchFilterState(): void;
    /** Filter visible options by search without rebuilding the list. */
    filterOptionsInPlace(search: string, searchFilter: (opt: Option, search: string) => boolean): void;
    private setOptionsListFullData;
    private isClosableOptgroupOpen;
    private closeClosableOptgroup;
    private closeOtherClosableOptgroups;
    private updateOptgroupVisibilityAfterSearch;
    private updateSearchResultsMessage;
    private removeListSearchMessage;
    private setOptionElementContent;
    /** True when option nodes exist in the list (selection can sync without re-searching). */
    hasRenderedOptions(): boolean;
    /** True when the open list already has options and search is not filtering. */
    canUpdateOptionSelectionInPlace(): boolean;
    /** Sync selected/hidden state on existing option nodes without rebuilding the list. */
    updateOptionSelection(): void;
    private updateOptgroupSelectAllStates;
    private optgroupSelectAllLabel;
    private isOptgroupAllSelected;
    option(option: Option): HTMLDivElement;
    destroy(): void;
    private highlightText;
    private setContentDirection;
    private setContentPosition;
    moveContentAbove(): void;
    moveContentBelow(): void;
    ensureElementInView(container: HTMLElement, element: HTMLElement): void;
    putContent(): 'up' | 'down';
    updateDeselectAll(): void;
}
