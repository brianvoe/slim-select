import { default as React } from 'react';
import { default as SlimSelectCore, Config } from '../index';
import { DataArrayPartial } from '../store';
export interface SlimSelectProps {
    data?: DataArrayPartial;
    settings?: Config['settings'];
    events?: Config['events'];
    cssClasses?: Config['cssClasses'];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    children?: React.ReactNode;
    multiple?: boolean;
}
export interface SlimSelectRef {
    slimSelect: SlimSelectCore | null;
}
declare const SlimSelect: React.ForwardRefExoticComponent<SlimSelectProps & React.RefAttributes<SlimSelectRef>>;
export default SlimSelect;
