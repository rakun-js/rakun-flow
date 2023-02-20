import { RakunMono, Void } from "rakun";
import { RakunFlowState, RakunFlowSnapshotState, RakunFlowValue } from "../../types";
import { RakunFlowSelectorBuildConfig } from "../interface";
export declare class RakunFlowSelectorStateImpl<T> implements RakunFlowState<T> {
    private rakunFlowValue;
    private _set;
    get path(): string;
    constructor(config: RakunFlowSelectorBuildConfig<T>, rakunFlowValue: RakunFlowValue<T>);
    getState(): RakunMono<RakunFlowSnapshotState<T>>;
    subscribe(callback: (value: RakunFlowSnapshotState) => void): RakunMono<() => RakunMono<typeof Void>>;
    get(): RakunMono<T>;
    set(value: T): RakunMono<typeof Void>;
    reset(): RakunMono<typeof Void>;
}
