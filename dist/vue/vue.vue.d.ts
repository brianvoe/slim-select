import { PropType } from 'vue';
import { default as SlimSelect, Events, Option, Optgroup, Settings } from '../index';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<string | string[] | undefined>;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: PropType<(Partial<Option> | Partial<Optgroup>)[]>;
    };
    settings: {
        type: PropType<Partial<Settings>>;
    };
    events: {
        type: PropType<Events>;
        default: () => {};
    };
}>, {}, {
    slim: SlimSelect | null;
}, {
    value: {
        get(): string | string[];
        set(value: string | string[]): void;
    };
}, {
    getSlimSelect(): {
        selectEl: HTMLSelectElement;
        settings: {
            id: string;
            style: string;
            class: string[];
            isMultiple: boolean;
            isOpen: boolean;
            isFullOpen: boolean;
            intervalMove: {
                close: () => NodeJS.Timeout;
                hasRef: () => boolean;
                ref: () => NodeJS.Timeout;
                refresh: () => NodeJS.Timeout;
                unref: () => NodeJS.Timeout;
                _onTimeout: (...args: any[]) => void;
                [Symbol.toPrimitive]: () => number;
                [Symbol.dispose]: () => void;
            } | null;
            disabled: boolean;
            alwaysOpen: boolean;
            showSearch: boolean;
            focusSearch: boolean;
            ariaLabel: string;
            searchPlaceholder: string;
            searchText: string;
            searchingText: string;
            searchHighlight: boolean;
            closeOnSelect: boolean;
            contentLocation: HTMLElement | null;
            contentPosition: "relative" | "absolute" | "fixed";
            openPosition: "auto" | "up" | "down";
            placeholderText: string;
            allowDeselect: boolean;
            hideSelected: boolean;
            keepOrder: boolean;
            showOptionTooltips: boolean;
            minSelected: number;
            maxSelected: number;
            timeoutDelay: number;
            maxValuesShown: number;
            maxValuesMessage: string;
            addableText: string;
        };
        cssClasses: {
            main: string;
            placeholder: string;
            values: string;
            single: string;
            max: string;
            value: string;
            valueText: string;
            valueDelete: string;
            valueOut: string;
            deselect: string;
            deselectPath: string;
            arrow: string;
            arrowClose: string;
            arrowOpen: string;
            content: string;
            contentOpen: string;
            dirAbove: string;
            dirBelow: string;
            search: string;
            searchHighlighter: string;
            searching: string;
            addable: string;
            addablePath: string;
            list: string;
            optgroup: string;
            optgroupLabel: string;
            optgroupLabelText: string;
            optgroupActions: string;
            optgroupSelectAll: string;
            optgroupSelectAllBox: string;
            optgroupSelectAllCheck: string;
            optgroupClosable: string;
            option: string;
            optionDelete: string;
            highlighted: string;
            mainOpen: string;
            close: string;
            selected: string;
            error: string;
            disabled: string;
            hide: string;
        };
        select: {
            select: HTMLSelectElement;
            onValueChange?: ((value: Option[]) => void) | undefined;
            onClassChange?: ((classes: string[]) => void) | undefined;
            onDisabledChange?: ((disabled: boolean) => void) | undefined;
            onOptionsChange?: ((data: (Option | Optgroup)[]) => void) | undefined;
            listen: boolean;
            enable: () => void;
            disable: () => void;
            hideUI: () => void;
            showUI: () => void;
            changeListen: (listen: boolean) => void;
            valueChange: (ev: Event) => boolean;
            getData: () => (Option | Optgroup)[];
            getDataFromOptgroup: (optgroup: HTMLOptGroupElement) => Optgroup;
            getDataFromOption: (option: HTMLOptionElement) => Option;
            getSelectedOptions: () => Option[];
            getSelectedValues: () => string[];
            setSelected: (ids: string[]) => void;
            setSelectedByValue: (values: string[]) => void;
            updateSelect: (id?: string, style?: string, classes?: string[]) => void;
            updateOptions: (data: (Option | Optgroup)[]) => void;
            createOptgroup: (optgroup: Optgroup) => HTMLOptGroupElement;
            createOption: (info: Option) => HTMLOptionElement;
            destroy: () => void;
        };
        store: {
            validateDataArray: (data: (Partial<Option> | Partial<Optgroup>)[]) => Error | null;
            validateOption: (option: Partial<Option>) => Error | null;
            partialToFullData: (data: (Partial<Option> | Partial<Optgroup>)[]) => (Option | Optgroup)[];
            setData: (data: (Partial<Option> | Partial<Optgroup>)[], preserveSelected?: boolean) => void;
            getData: () => Option[] | Optgroup[];
            getDataOptions: () => Option[];
            addOption: (option: Partial<Option>, addToStart?: boolean) => void;
            setSelectedBy: (selectedType: "id" | "value", selectedValues: string[]) => void;
            getSelected: () => string[];
            getSelectedValues: () => string[];
            getSelectedOptions: () => Option[];
            getOptgroupByID: (id: string) => Optgroup | null;
            getOptionByID: (id: string) => Option | null;
            getSelectType: () => string;
            getFirstOption: () => Option | null;
            search: (search: string, searchFilter: (opt: Option, search: string) => boolean) => (Option | Optgroup)[];
            filter: (filter: {
                (opt: Option): boolean;
            } | null, includeOptgroup: boolean) => (Option | Optgroup)[];
            selectedOrderOptions: (options: Option[]) => Option[];
        };
        render: {
            settings: {
                id: string;
                style: string;
                class: string[];
                isMultiple: boolean;
                isOpen: boolean;
                isFullOpen: boolean;
                intervalMove: {
                    close: () => NodeJS.Timeout;
                    hasRef: () => boolean;
                    ref: () => NodeJS.Timeout;
                    refresh: () => NodeJS.Timeout;
                    unref: () => NodeJS.Timeout;
                    _onTimeout: (...args: any[]) => void;
                    [Symbol.toPrimitive]: () => number;
                    [Symbol.dispose]: () => void;
                } | null;
                disabled: boolean;
                alwaysOpen: boolean;
                showSearch: boolean;
                focusSearch: boolean;
                ariaLabel: string;
                searchPlaceholder: string;
                searchText: string;
                searchingText: string;
                searchHighlight: boolean;
                closeOnSelect: boolean;
                contentLocation: HTMLElement | null;
                contentPosition: "relative" | "absolute" | "fixed";
                openPosition: "auto" | "up" | "down";
                placeholderText: string;
                allowDeselect: boolean;
                hideSelected: boolean;
                keepOrder: boolean;
                showOptionTooltips: boolean;
                minSelected: number;
                maxSelected: number;
                timeoutDelay: number;
                maxValuesShown: number;
                maxValuesMessage: string;
                addableText: string;
            };
            store: {
                validateDataArray: (data: (Partial<Option> | Partial<Optgroup>)[]) => Error | null;
                validateOption: (option: Partial<Option>) => Error | null;
                partialToFullData: (data: (Partial<Option> | Partial<Optgroup>)[]) => (Option | Optgroup)[];
                setData: (data: (Partial<Option> | Partial<Optgroup>)[], preserveSelected?: boolean) => void;
                getData: () => Option[] | Optgroup[];
                getDataOptions: () => Option[];
                addOption: (option: Partial<Option>, addToStart?: boolean) => void;
                setSelectedBy: (selectedType: "id" | "value", selectedValues: string[]) => void;
                getSelected: () => string[];
                getSelectedValues: () => string[];
                getSelectedOptions: () => Option[];
                getOptgroupByID: (id: string) => Optgroup | null;
                getOptionByID: (id: string) => Option | null;
                getSelectType: () => string;
                getFirstOption: () => Option | null;
                search: (search: string, searchFilter: (opt: Option, search: string) => boolean) => (Option | Optgroup)[];
                filter: (filter: {
                    (opt: Option): boolean;
                } | null, includeOptgroup: boolean) => (Option | Optgroup)[];
                selectedOrderOptions: (options: Option[]) => Option[];
            };
            callbacks: {
                open: () => void;
                close: () => void;
                addable?: ((value: string) => Promise<Partial<Option> | string> | Partial<Option> | string | false | undefined | null | Error) | undefined;
                setSelected: (value: string | string[], runAfterChange: boolean) => void;
                addOption: (option: Option) => void;
                search: (search: string) => void;
                beforeChange?: ((newVal: Option[], oldVal: Option[]) => boolean | void) | undefined;
                afterChange?: ((newVal: Option[]) => void) | undefined;
            };
            main: {
                main: HTMLDivElement;
                values: HTMLDivElement;
                deselect: {
                    main: HTMLDivElement;
                    svg: SVGSVGElement;
                    path: SVGPathElement;
                };
                arrow: {
                    main: SVGSVGElement;
                    path: SVGPathElement;
                };
            };
            content: {
                main: HTMLDivElement;
                search: {
                    main: HTMLDivElement;
                    input: HTMLInputElement;
                    addable?: {
                        main: HTMLDivElement;
                        svg: SVGSVGElement;
                        path: SVGPathElement;
                    } | undefined;
                };
                list: HTMLDivElement;
            };
            classes: {
                main: string;
                placeholder: string;
                values: string;
                single: string;
                max: string;
                value: string;
                valueText: string;
                valueDelete: string;
                valueOut: string;
                deselect: string;
                deselectPath: string;
                arrow: string;
                arrowClose: string;
                arrowOpen: string;
                content: string;
                contentOpen: string;
                dirAbove: string;
                dirBelow: string;
                search: string;
                searchHighlighter: string;
                searching: string;
                addable: string;
                addablePath: string;
                list: string;
                optgroup: string;
                optgroupLabel: string;
                optgroupLabelText: string;
                optgroupActions: string;
                optgroupSelectAll: string;
                optgroupSelectAllBox: string;
                optgroupSelectAllCheck: string;
                optgroupClosable: string;
                option: string;
                optionDelete: string;
                highlighted: string;
                mainOpen: string;
                close: string;
                selected: string;
                error: string;
                disabled: string;
                hide: string;
            };
            enable: () => void;
            disable: () => void;
            open: () => void;
            close: () => void;
            updateClassStyles: () => void;
            updateAriaAttributes: () => void;
            mainDiv: () => import('../render').Main;
            mainFocus: (eventType: string | null) => void;
            placeholder: () => HTMLDivElement;
            renderValues: () => void;
            multipleValue: (option: Option) => HTMLDivElement;
            contentDiv: () => import('../render').Content;
            moveContent: () => void;
            searchDiv: () => import('../render').Search;
            searchFocus: () => void;
            clearSearch: () => void;
            getOptions: (notPlaceholder?: boolean, notDisabled?: boolean, notHidden?: boolean) => HTMLDivElement[];
            highlight: (dir: "up" | "down") => void;
            listDiv: () => HTMLDivElement;
            renderError: (error: string) => void;
            renderSearching: () => void;
            renderOptions: (data: (Option | Optgroup)[]) => void;
            option: (option: Option) => HTMLDivElement;
            destroy: () => void;
            moveContentAbove: () => void;
            moveContentBelow: () => void;
            ensureElementInView: (container: HTMLElement, element: HTMLElement) => void;
            putContent: () => "up" | "down";
            updateDeselectAll: () => void;
        };
        events: Events;
        enable: () => void;
        disable: () => void;
        getData: () => Option[] | Optgroup[];
        setData: (data: (Partial<Option> | Partial<Optgroup>)[]) => void;
        getSelected: () => string[];
        setSelected: (values: string | string[], runAfterChange?: boolean) => void;
        addOption: (option: Partial<Option>) => void;
        open: () => void;
        close: (eventType?: string | null) => void;
        search: (value: string) => void;
        destroy: () => void;
    } | null;
    getCleanValue(val: string | string[] | undefined): string | string[];
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<string | string[] | undefined>;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: PropType<(Partial<Option> | Partial<Optgroup>)[]>;
    };
    settings: {
        type: PropType<Partial<Settings>>;
    };
    events: {
        type: PropType<Events>;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    multiple: boolean;
    events: Events;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
