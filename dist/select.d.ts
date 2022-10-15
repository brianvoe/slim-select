import SlimSelect from './index';
import { dataArray } from './data';
interface Constructor {
    select: HTMLSelectElement;
    main: SlimSelect;
}
export declare class Select {
    element: HTMLSelectElement;
    main: SlimSelect;
    mutationObserver: MutationObserver | null;
    triggerMutationObserver: boolean;
    constructor(info: Constructor);
    setValue(): void;
    addAttributes(): void;
    addEventListeners(): void;
    addMutationObserver(): void;
    observeMutationObserver(): void;
    disconnectMutationObserver(): void;
    create(data: dataArray): void;
    createOption(info: any): HTMLOptionElement;
}
export {};
