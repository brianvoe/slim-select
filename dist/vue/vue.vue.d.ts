import { PropType } from 'vue';
import { default as SlimSelect, Events } from '../index';
import { SettingsPartial } from '../settings';
import { DataArrayPartial, Option } from '../store';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<string | string[] | undefined>;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: PropType<DataArrayPartial>;
    };
    settings: {
        type: PropType<SettingsPartial>;
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
            intervalMove: ReturnType<typeof setInterval> | null;
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
            onOptionsChange?: ((data: DataArrayPartial) => void) | undefined;
            listen: boolean;
            enable: () => void;
            disable: () => void;
            hideUI: () => void;
            showUI: () => void;
            changeListen: (listen: boolean) => void;
            valueChange: (ev: Event) => boolean;
            getData: () => DataArrayPartial;
            getDataFromOptgroup: (optgroup: HTMLOptGroupElement) => import('../store').OptgroupOptional;
            getDataFromOption: (option: HTMLOptionElement) => Option;
            getSelectedOptions: () => Option[];
            getSelectedValues: () => string[];
            setSelected: (ids: string[]) => void;
            setSelectedByValue: (values: string[]) => void;
            updateSelect: (id?: string, style?: string, classes?: string[]) => void;
            updateOptions: (data: import('../store').DataArray) => void;
            createOptgroup: (optgroup: import('../store').Optgroup) => HTMLOptGroupElement;
            createOption: (info: Option) => HTMLOptionElement;
            destroy: () => void;
        };
        store: {
            validateDataArray: (data: import('../store').DataArray | DataArrayPartial) => Error | null;
            validateOption: (option: Option | import('../store').OptionOptional) => Error | null;
            partialToFullData: (data: DataArrayPartial) => import('../store').DataArray;
            setData: (data: import('../store').DataArray | DataArrayPartial, preserveSelected?: boolean) => void;
            getData: () => import('../store').DataArray;
            getDataOptions: () => Option[];
            addOption: (option: import('../store').OptionOptional, addToStart?: boolean) => void;
            setSelectedBy: (selectedType: "id" | "value", selectedValues: string[]) => void;
            getSelected: () => string[];
            getSelectedValues: () => string[];
            getSelectedOptions: () => Option[];
            getOptgroupByID: (id: string) => import('../store').Optgroup | null;
            getOptionByID: (id: string) => Option | null;
            getSelectType: () => string;
            getFirstOption: () => Option | null;
            search: (search: string, searchFilter: (opt: Option, search: string) => boolean) => import('../store').DataArray;
            filter: (filter: {
                (opt: Option): boolean;
            } | null, includeOptgroup: boolean) => import('../store').DataArray;
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
                intervalMove: ReturnType<typeof setInterval> | null;
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
                validateDataArray: (data: import('../store').DataArray | DataArrayPartial) => Error | null;
                validateOption: (option: Option | import('../store').OptionOptional) => Error | null;
                partialToFullData: (data: DataArrayPartial) => import('../store').DataArray;
                setData: (data: import('../store').DataArray | DataArrayPartial, preserveSelected?: boolean) => void;
                getData: () => import('../store').DataArray;
                getDataOptions: () => Option[];
                addOption: (option: import('../store').OptionOptional, addToStart?: boolean) => void;
                setSelectedBy: (selectedType: "id" | "value", selectedValues: string[]) => void;
                getSelected: () => string[];
                getSelectedValues: () => string[];
                getSelectedOptions: () => Option[];
                getOptgroupByID: (id: string) => import('../store').Optgroup | null;
                getOptionByID: (id: string) => Option | null;
                getSelectType: () => string;
                getFirstOption: () => Option | null;
                search: (search: string, searchFilter: (opt: Option, search: string) => boolean) => import('../store').DataArray;
                filter: (filter: {
                    (opt: Option): boolean;
                } | null, includeOptgroup: boolean) => import('../store').DataArray;
                selectedOrderOptions: (options: Option[]) => Option[];
            };
            callbacks: {
                open: () => void;
                close: () => void;
                addable?: ((value: string) => Promise<import('../store').OptionOptional | string> | import('../store').OptionOptional | string | false | undefined | null | Error) | undefined;
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
            renderOptions: (data: import('../store').DataArray) => void;
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
        getData: () => import('../store').DataArray;
        setData: (data: DataArrayPartial) => void;
        getSelected: () => string[];
        setSelected: (values: string | string[], runAfterChange?: boolean) => void;
        addOption: (option: import('../store').OptionOptional) => void;
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
        type: PropType<DataArrayPartial>;
    };
    settings: {
        type: PropType<SettingsPartial>;
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
