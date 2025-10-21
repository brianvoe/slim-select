import { default as React } from 'react';
import { default as SlimSelectCore, Config, Option, Optgroup } from '../index';
export interface SlimSelectProps {
    data?: (Partial<Option> | Partial<Optgroup>)[];
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
