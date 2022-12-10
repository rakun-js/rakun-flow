
import { RakunMono } from "rakun";
import { RakunFlowSnapshotManager } from "../../snapshot";
import snapshotManager from "../../snapshot/manager";
import { Get, RakunFlowSnapshotState, RakunFlowValue } from "../../types";
import { RakunFlowSelectorBuildConfigReadOnly } from "../interface";

export class RakunFlowSelectorValueImpl<T> implements RakunFlowValue<T>  {
    _get: Get<T>;
    path: string;
    manager: RakunFlowSnapshotManager;
    constructor(config: RakunFlowSelectorBuildConfigReadOnly<T>) {
        this.path = config['path'];
        this._get = config['get'];
        this.manager = snapshotManager(this.path, 'selector')
    }

    get(): RakunMono<T> {
        return this.getState()
            .pipe((s) => s.value as T)
    }

    getState = () => this.manager.getState(() => this._get)
    subscribe = (callback: (value: RakunFlowSnapshotState<T>) => void) => this.manager.subscribe(callback)
    reset = () => this.manager.reset()
}
