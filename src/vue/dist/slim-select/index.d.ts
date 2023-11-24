import Settings, { SettingsPartial } from './settings';
import Render from './render';
import Select from './select';
import Store, { DataArray, DataArrayPartial, Option, OptionOptional } from './store';
export interface Config {
    select: string | Element;
    data?: DataArrayPartial;
    settings?: SettingsPartial;
    events?: Events;
}
export interface Events {
    search?: (searchValue: string, currentData: DataArray) => Promise<DataArrayPartial> | DataArrayPartial;
    searchFilter?: (option: Option, search: string) => boolean;
    addable?: (value: string) => Promise<OptionOptional | string> | OptionOptional | string | false | null | undefined;
    beforeChange?: (newVal: Option[], oldVal: Option[]) => boolean | void;
    afterChange?: (newVal: Option[]) => void;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    error?: (err: Error) => void;
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
    setData(data: DataArrayPartial): void;
    getSelected(): string[];
    setSelected(value: string | string[], runAfterChange?: boolean): void;
    addOption(option: OptionOptional): void;
    open(): void;
    close(eventType?: string | null): void;
    search(value: string): void;
    destroy(): void;
    private windowResize;
    private windowScroll;
    private documentClick;
    private windowVisibilityChange;
}
