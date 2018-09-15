import { dataArray, option } from './data';
import SlimSelect from './index';
interface Constructor {
    select: HTMLSelectElement;
    main: SlimSelect;
}
export default class select {
    element: HTMLSelectElement;
    main: SlimSelect;
    mutationObserver: MutationObserver;
    constructor(info: Constructor);
    setValue(): void;
    addAttributes(): void;
    addEventListeners(): void;
    addMutationObserver(): void;
    observeMutationObserver(): void;
    disconnectMutationObserver(): void;
    create(data: dataArray): void;
    createOption(info: option): HTMLOptionElement;
}
export {};
