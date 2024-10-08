import { DataArray, DataArrayPartial, Optgroup, OptgroupOptional, Option } from './store';
export default class Select {
    select: HTMLSelectElement;
    onValueChange?: (value: Option[]) => void;
    onClassChange?: (classes: string[]) => void;
    onDisabledChange?: (disabled: boolean) => void;
    onOptionsChange?: (data: DataArrayPartial) => void;
    listen: boolean;
    private observer;
    constructor(select: HTMLSelectElement);
    enable(): void;
    disable(): void;
    hideUI(): void;
    showUI(): void;
    changeListen(listen: boolean): void;
    valueChange(ev: Event): boolean;
    private observeCall;
    getData(): DataArrayPartial;
    getDataFromOptgroup(optgroup: HTMLOptGroupElement): OptgroupOptional;
    getDataFromOption(option: HTMLOptionElement): Option;
    getSelectedOptions(): Option[];
    getSelectedValues(): string[];
    setSelected(ids: string[]): void;
    setSelectedByValue(values: string[]): void;
    updateSelect(id?: string, style?: string, classes?: string[]): void;
    updateOptions(data: DataArray): void;
    createOptgroup(optgroup: Optgroup): HTMLOptGroupElement;
    createOption(info: Option): HTMLOptionElement;
    destroy(): void;
}
