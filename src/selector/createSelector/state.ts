
import { RakunMono, Void } from "rakun";
import { Set, RakunFlowState, RakunFlowSnapshotState, RakunFlowValue } from "../../types";
import { RakunFlowSelectorBuildConfig } from "../interface";


export class RakunFlowSelectorStateImpl<T> implements RakunFlowState<T>  {
    private _set: Set<T>;
    get path() {
        return this.rakunFlowValue.path;
    };
    constructor(config: RakunFlowSelectorBuildConfig<T>, private rakunFlowValue: RakunFlowValue<T>) {
        this._set = config.set
    }
    getState(): RakunMono<RakunFlowSnapshotState<T>> {
        return this.rakunFlowValue.getState();
    }
    subscribe(callback: (value: RakunFlowSnapshotState) => void): RakunMono<() => RakunMono<typeof Void>> {
        return this.rakunFlowValue.subscribe(callback);
    }
    get(): RakunMono<T> {
        return this.rakunFlowValue.get();
    }
    set(value: T): RakunMono<typeof Void> {

        return this._set(value);
    }

    reset(): RakunMono<typeof Void> {
        return this.rakunFlowValue.reset();
    }
}

