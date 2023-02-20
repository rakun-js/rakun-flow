import { RakunMono, Void } from "rakun";
import { Get, ZoldyState, ZoldyStoreState, ZoldyValue } from "../types";
import { ZoldySelectorBuildConfig, ZoldySelectorBuildConfigReadOnly } from "./interface";
export declare class ZoldySelectorValueImpl<T> implements ZoldyValue<T> {
    _get: Get<T>;
    path: string;
    constructor(config: ZoldySelectorBuildConfigReadOnly<T>);
    subscribe(callback: (value: ZoldyStoreState) => void): RakunMono<() => RakunMono<typeof Void>>;
    getState(): RakunMono<ZoldyStoreState<T>>;
    get(): RakunMono<T>;
    reset(): RakunMono<typeof Void>;
}
export declare class ZoldySelectorStateImpl<T> implements ZoldyState<T> {
    private zoldyValue;
    private _set;
    get path(): string;
    constructor(config: ZoldySelectorBuildConfig<T>, zoldyValue: ZoldyValue<T>);
    getState(): RakunMono<ZoldyStoreState<T>>;
    subscribe(callback: (value: ZoldyStoreState) => void): RakunMono<() => RakunMono<typeof Void>>;
    get(): RakunMono<T>;
    set(value: T): RakunMono<typeof Void>;
    reset(): RakunMono<typeof Void>;
}
