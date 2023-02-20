import { RakunMono } from "rakun";
import { RakunFlowSnapshotManager } from "../../snapshot";
import { Get, RakunFlowSnapshotState, RakunFlowValue } from "../../types";
import { RakunFlowSelectorBuildConfigReadOnly } from "../interface";
export declare class RakunFlowSelectorValueImpl<T> implements RakunFlowValue<T> {
    _get: Get<T>;
    path: string;
    manager: RakunFlowSnapshotManager;
    constructor(config: RakunFlowSelectorBuildConfigReadOnly<T>);
    get(): RakunMono<T>;
    getState: () => RakunMono<RakunFlowSnapshotState<any>>;
    subscribe: (callback: (value: RakunFlowSnapshotState<T>) => void) => RakunMono<() => RakunMono<typeof import("rakun").Void>>;
    reset: () => RakunMono<typeof import("rakun").Void>;
}
