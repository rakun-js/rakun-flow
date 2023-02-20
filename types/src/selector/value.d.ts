import { RakunMono, Void } from "rakun";
import { Get, ZoldyStoreState, ZoldyValue } from "../types";
import { ZoldySelectorBuildConfigReadOnly } from "./interface";
export declare class ZoldySelectorValueImpl<T> implements ZoldyValue<T> {
    _get: Get<T>;
    path: string;
    constructor(config: ZoldySelectorBuildConfigReadOnly<T>);
    subscribe(callback: (value: ZoldyStoreState) => void): RakunMono<() => RakunMono<typeof Void>>;
    getState(): RakunMono<ZoldyStoreState<T>>;
    get(): RakunMono<T>;
    reset(): RakunMono<typeof Void>;
}
