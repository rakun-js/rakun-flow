import { RakunMono, Void } from "rakun";
import { ZoldyState, ZoldyStoreState, ZoldyValue } from "../types";
import { ZoldySelectorBuildConfig } from "./interface";
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
