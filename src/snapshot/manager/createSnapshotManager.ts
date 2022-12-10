
import { RakunFlowSnapshotStateType } from "../../types";
import { RakunFlowSnapshotManager } from "../interface";
import { getState } from "./getState";
import { reset } from "./reset";
import { set } from "./set";
import { subscribe } from "./subscribe";


class RakunFlowSnapshotManagerImpl implements RakunFlowSnapshotManager {

    constructor(public path: string, public type: RakunFlowSnapshotStateType) {

    }
    set = set(this.path, this.type)
    reset = reset(this.path, this.type)
    subscribe = subscribe(this.path)
    getState = getState(this.path, this.type)

}
export const createSnapshotManager = (path: string, type: RakunFlowSnapshotStateType): RakunFlowSnapshotManager => {
    return new RakunFlowSnapshotManagerImpl(path, type)
}
