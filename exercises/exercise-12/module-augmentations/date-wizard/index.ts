// This enabled module augmentation mode.
import 'date-wizard';

declare module 'date-wizard' {
    export interface DateDetails {
        hours: number;
    }

    export function pad(v: number): string;
}
