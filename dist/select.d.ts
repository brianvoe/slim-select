import { DataArray } from './data';
import SlimSelect from './index';
export interface SelectConstructor {
    select: HTMLSelectElement;
    main: SlimSelect;
}
export declare class Select {
    element: HTMLSelectElement;
    main: SlimSelect;
    mutationObserver: MutationObserver | null;
    triggerMutationObserver: boolean;
    constructor(info: SelectConstructor);
    setValue(): void;
    addAttributes(): void;
    addEventListeners(): void;
    addMutationObserver(): void;
    observeMutationObserver(): void;
    disconnectMutationObserver(): void;
    create(data: DataArray): void;
    createOption(info: any): HTMLOptionElement;
}
