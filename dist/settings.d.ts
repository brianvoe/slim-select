/// <reference types="node" />
export type SettingsPartial = Partial<Settings>;
export default class Settings {
    id: string;
    style: string;
    class: string[];
    isMultiple: boolean;
    isOpen: boolean;
    isFullOpen: boolean;
    intervalMove: NodeJS.Timeout | null;
    disabled: boolean;
    alwaysOpen: boolean;
    showSearch: boolean;
    ariaLabel: string;
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
    minSelected: number;
    maxSelected: number;
    timeoutDelay: number;
    maxValuesShown: number;
    maxValuesMessage: string;
    constructor(settings?: SettingsPartial);
}
