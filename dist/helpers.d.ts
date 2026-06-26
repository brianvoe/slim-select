import { Optgroup, Option } from './store';
type DataItem = Partial<Option> | Partial<Optgroup>;
export declare function generateID(): string;
export declare function hasClassInTree(element: HTMLElement, className: string): HTMLElement | null;
export declare function debounce<T extends (...args: any[]) => void>(func: T, wait?: number, immediate?: boolean): () => void;
export declare function isEqual(a: any, b: any): boolean;
/** Compare selected id sets regardless of order (multi-select). */
export declare function selectedIdsEqual(a: string[], b: string[]): boolean;
/** Compare option/optgroup arrays without JSON.stringify. */
export declare function dataStructureEqual(a: DataItem[], b: DataItem[]): boolean;
export declare function kebabCase(str: string): string;
export {};
