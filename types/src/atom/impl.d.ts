import { RakunMono, Void } from "rakun";
import { Default, ZoldyState, ZoldyStoreState } from "../types";
export type Config<T> = {
    path: string;
    default: () => Default<T>;
};
export declare class ZoldyAtomImpl<T> implements ZoldyState<T> {
    private _default;
    path: string;
    constructor(config: Config<T>);
    get(): RakunMono<T>;
    getState(): RakunMono<ZoldyStoreState<T>>;
    subscribe(callback: (value: ZoldyStoreState) => void): RakunMono<() => RakunMono<typeof Void>>;
    reset(): RakunMono<typeof Void>;
    set(value: T): RakunMono<typeof Void>;
}
