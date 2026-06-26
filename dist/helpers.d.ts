import { Optgroup, Option } from './store';
import { ModalSetting } from './settings';
type DataItem = Partial<Option> | Partial<Optgroup>;
/** Copy option data attributes into a plain object (not a live DOMStringMap). */
export declare function copyOptionData(data?: {
    [key: string]: string;
} | DOMStringMap | null): {
    [key: string]: string;
};
/** Label text only — excludes nested form controls (e.g. wrapped select options). */
export declare function getLabelElementText(label: HTMLLabelElement): string;
/** Associated label text for a select, or its aria-label when no label is linked. */
export declare function getAssociatedLabelText(select: HTMLSelectElement): string;
export declare function generateID(): string;
export declare function hasClassInTree(element: HTMLElement, className: string): HTMLElement | null;
export declare function debounce<T extends (...args: any[]) => void>(func: T, wait?: number, immediate?: boolean): () => void;
export declare function isEqual(a: any, b: any): boolean;
/** Compare selected id sets regardless of order (multi-select). */
export declare function selectedIdsEqual(a: string[], b: string[]): boolean;
/** Compare option/optgroup arrays without JSON.stringify. */
export declare function dataStructureEqual(a: DataItem[], b: DataItem[]): boolean;
export declare function kebabCase(str: string): string;
export declare function shouldUseModalView(modal: ModalSetting, viewportWidth?: number): boolean;
export {};
