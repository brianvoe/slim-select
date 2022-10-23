import { DataArray, Optgroup, Option } from './store';
export default class Select {
    select: HTMLSelectElement;
    listen: boolean;
    changeFunc?: (data: DataArray) => void;
    private observer;
    constructor(select: HTMLSelectElement);
    enable(): void;
    disable(): void;
    hideUI(): void;
    showUI(): void;
    changeListen(on: boolean): void;
    addChangeFunc(func: (data: DataArray) => void): void;
    removeChangeFunc(): void;
    private observeWrapper;
    private addObserver;
    private connectObserver;
    private disconnectObserver;
    getData(): DataArray;
    getOptgroupData(optgroup: HTMLOptGroupElement): Optgroup;
    getOptionData(option: HTMLOptionElement): Option;
    updateSelect(id?: string, style?: string, classes?: string[]): void;
    updateOptions(data: DataArray): void;
    createOptgroup(optgroup: Optgroup): HTMLOptGroupElement;
    createOption(info: Option): HTMLOptionElement;
}
