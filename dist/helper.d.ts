import { option } from './data';
export declare function hasClassInTree(element: Element, className: string): Element;
export declare function ensureElementInView(container: HTMLElement, element: HTMLElement): void;
export declare function putContent(el: HTMLElement, currentPosition: string, isOpen: boolean): string;
export declare function debounce(func: (...args: any[]) => any, wait?: number, immediate?: boolean): (this: any, ...args: any[]) => void;
export declare function isValueInArrayOfObjects(selected: option | option[], key: string, value: string): boolean;
export declare function highlight(text: string, search: string, className: string): string;
