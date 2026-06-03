export declare const useAppStore: import('pinia').StoreDefinition<"app", {
    width: number;
}, {
    isLocalhost: () => boolean;
    isMobile: (state: {
        width: number;
    } & import('pinia').PiniaCustomStateProperties<{
        width: number;
    }>) => boolean;
}, {
    setWidth(width: number): void;
}>;
