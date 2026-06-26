export interface NavLink {
    label: string;
    path: string;
}
export interface HeaderItem {
    id: string;
    label: string;
    /** Direct link (no dropdown) */
    path?: string;
    /** Dropdown of pages */
    children?: NavLink[];
}
/**
 * Top header is intentionally short. "Docs" and "Frameworks" open a dropdown of
 * pages; each page renders its own "On this page" sidebar (see page_nav.vue).
 */
export declare const headerItems: HeaderItem[];
export declare function hasSidebar(path: string): boolean;
/** Which header item should appear active for the current route. */
export declare function activeHeaderId(path: string): string | null;
