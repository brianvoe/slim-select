/// <reference types="node" />
export declare type SettingsPartial = Partial<Settings>;
export default class Settings {
    id: string;
    style: string;
    class: string[];
    isMultiple: boolean;
    isOpen: boolean;
    triggerFocus: boolean;
    intervalMove: NodeJS.Timeout | null;
    mainHeight: number;
    contentHeight: number;
    isEnabled: boolean;
    alwaysOpen: boolean;
    showSearch: boolean;
    searchPlaceholder: string;
    searchText: string;
    searchingText: string;
    searchHighlight: boolean;
    closeOnSelect: boolean;
    contentLocation: HTMLElement;
    contentPosition: 'relative' | 'absolute';
    openPosition: 'auto' | 'up' | 'down';
    placeholderText: string;
    allowDeselect: boolean;
    hideSelected: boolean;
    showOptionTooltips: boolean;
    selectByGroup: boolean;
    minSelected: number;
    maxSelected: number;
    timeoutDelay: number;
    constructor(settings?: SettingsPartial);
}
