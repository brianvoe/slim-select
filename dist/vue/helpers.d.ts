/** Recursively strip Vue reactivity so structuredClone won't throw on Proxy objects. */
export declare function deepToRaw<T>(input: T): T;
