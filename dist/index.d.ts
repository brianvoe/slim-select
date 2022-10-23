import Render from './render';
import Select from './select';
import Settings from './settings';
import Store, { DataArray, Option } from './store';
export * from './helper';
export * from './render';
export * from './select';
export * from './settings';
export * from './store';
export interface Config {
    select: string | Element;
    data?: DataArray;
    settings?: Settings;
    events?: Events;
}
export interface Events {
    ajax?: (value: string, func: (info: any) => void) => void;
    addable?: (value: string) => Option | string;
    beforeOnChange?: (info: Option | Option[]) => void | boolean;
    onChange?: (info: Option | Option[]) => void;
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
    setEvents(events: Events): void;
    setPosition(position: 'up' | 'down'): void;
    enable(): void;
    disable(): void;
    destroy(ssid: string): void;
    private windowScroll;
    private documentClick;
}
