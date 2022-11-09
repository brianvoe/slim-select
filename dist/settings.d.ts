export declare type SettingsPartial = Partial<Settings>;
export default class Settings {
    id: string;
    style: string;
    class: string[];
    isMultiple: boolean;
    isOpen: boolean;
    isTabbing: boolean;
    isEnabled: boolean;
    showSearch: boolean;
    searchPlaceholder: string;
    searchText: string;
    searchingText: string;
    searchHighlight: boolean;
    closeOnSelect: boolean;
    contentLocation: HTMLElement;
    contentPosition: 'auto' | 'up' | 'down';
    placeholderText: string;
    allowDeselect: boolean;
    hideSelected: boolean;
    useHtml: boolean;
    showOptionTooltips: boolean;
    selectByGroup: boolean;
    minSelected: number;
    maxSelected: number;
    timeoutDelay: number;
    constructor(settings?: SettingsPartial);
}
