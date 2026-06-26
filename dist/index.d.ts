import { default as CssClasses } from './classes';
import { default as Lifecycle } from './lifecycle';
import { default as Render } from './render';
import { default as Select } from './select';
import { default as Settings, MODAL_MOBILE_BREAKPOINT } from './settings';
import { default as Store, Option, Optgroup } from './store';
import { default as SyncCoordinator } from './sync';
export { Settings, Option, Optgroup, MODAL_MOBILE_BREAKPOINT };
export type { ModalSetting } from './settings';
export type { Main, Content, Search } from './render';
export interface Config {
    select: string | Element;
    data?: (Partial<Option> | Partial<Optgroup>)[];
    settings?: Partial<Settings>;
    cssClasses?: Partial<CssClasses>;
    events?: Events;
}
export interface Events {
    search?: (searchValue: string, selected: Option[], catalog?: (Option | Optgroup)[]) => Promise<(Partial<Option> | Partial<Optgroup>)[]> | (Partial<Option> | Partial<Optgroup>)[];
    searchFilter?: (option: Option, search: string) => boolean;
    addable?: (value: string) => Promise<Partial<Option> | string> | Partial<Option> | string | false | null | undefined | Error;
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
    sync: SyncCoordinator;
    lifecycle: Lifecycle;
    private globalEvents;
    /** Invalidates in-flight API search responses when the query changes or clears. */
    private searchGeneration;
    events: Events;
    constructor(config: Config);
    enable(): void;
    disable(): void;
    getData(): Option[] | Optgroup[];
    setData(data: (Partial<Option> | Partial<Optgroup>)[]): void;
    getSelected(): string[];
    setSelected(values: string | string[], runAfterChange?: boolean): void;
    addOption(option: Partial<Option>): void;
    open(): void;
    close(eventType?: string | null): void;
    search(value: string): void;
    private clearSearch;
    private runLocalSearch;
    private runApiSearch;
    destroy(): void;
    private documentClick;
}
