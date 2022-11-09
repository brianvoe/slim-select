import Render from './render';
import Select from './select';
import Settings, { SettingsPartial } from './settings';
import Store, { DataArray, DataArrayPartial, Option, OptionOptional } from './store';
export * from './helper';
export * from './render';
export * from './select';
export * from './settings';
export * from './store';
export interface Config {
    select: string | Element;
    data?: DataArrayPartial;
    settings?: SettingsPartial;
    events?: Events;
}
export interface Events {
    search?: (searchValue: string, currentData: DataArray) => Promise<DataArrayPartial> | DataArrayPartial;
    searchFilter?: (opt: Option, search: string) => boolean;
    addable?: (value: string) => OptionOptional | string;
    beforeChange?: (newVal: Option[], oldVal: Option[]) => boolean | void;
    afterChange?: (newVal: Option[]) => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
}
export default class SlimSelect {
    selectEl: HTMLSelectElement;
    settings: Settings;
    select: Select;
    store: Store;
    render: Render;
    events: Events;
    constructor(config: Config);
    enable(): void;
    disable(): void;
    getData(): DataArray;
    getSelected(): DataArray;
    getSelectedOptions(): Option[];
    setSelected(value: string | string[], close?: boolean): void;
    setData(data: DataArrayPartial): void;
    addOption(option: OptionOptional): void;
    open(): void;
    close(): void;
    search(value: string): void;
    destroy(): void;
    private windowResize;
    private windowScroll;
    private documentClick;
}
