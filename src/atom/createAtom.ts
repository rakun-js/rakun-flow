
import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotManager } from "../snapshot";
import snapshotManager from "../snapshot/manager";
import { Default, RakunFlowState, RakunFlowSnapshotState } from "../types";
import { RakunFlowAtomStatic } from "./interface";
export type Config<T> = {
    path: string
    default: () => Default<T>
}


class RakunFlowAtomImpl<T> implements RakunFlowState<T>  {
    private _default: () => Default<T>;
    path: string;
    manager: RakunFlowSnapshotManager;
    constructor(config: Config<T>) {
        this.path = config['path'];
        this._default = config['default'];
        this.manager = snapshotManager(this.path, 'atom')
    }
    get(): RakunMono<T> {
        return this.getState()
            .pipe((s) => s.value as T)
    }
    getState = (): RakunMono<RakunFlowSnapshotState<T>> => this.manager.getState(this._default)
    subscribe = (callback: (value: RakunFlowSnapshotState<T>) => void): RakunMono<() => RakunMono<typeof Void>> => this.manager.subscribe(callback)
    reset = (): RakunMono<typeof Void> => this.manager.reset()
    set = (value: T): RakunMono<typeof Void> => this.manager.set(value)

}
export const createAtom: RakunFlowAtomStatic = (config) => {
    return new RakunFlowAtomImpl({
        default: () => config.default,
        path: config.path
    });
}