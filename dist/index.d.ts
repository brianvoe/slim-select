import { default as CssClasses } from './classes';
import { default as Render } from './render';
import { default as Select } from './select';
import { default as Settings, SettingsPartial } from './settings';
import { default as Store, DataArray, DataArrayPartial, DataObject, DataObjectPartial, Option, OptionOptional, Optgroup, OptgroupOptional } from './store';
export { Option, Optgroup };
export type { SettingsPartial, DataArray, DataArrayPartial, DataObject, DataObjectPartial, OptionOptional, OptgroupOptional };
export interface Config {
    select: string | Element;
    data?: DataArrayPartial;
    settings?: SettingsPartial;
    cssClasses?: Partial<CssClasses>;
    events?: Events;
}
export interface Events {
    search?: (searchValue: string, currentData: DataArray) => Promise<DataArrayPartial> | DataArrayPartial;
    searchFilter?: (option: Option, search: string) => boolean;
    addable?: (value: string) => Promise<OptionOptional | string> | OptionOptional | string | false | null | undefined | Error;
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
    cssClasses: CssClasses;
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
    setSelected(values: string | string[], runAfterChange?: boolean): void;
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
