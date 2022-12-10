import { mono, RakunMono, Void } from "rakun";
import { RakunFlowSnapshotStateType } from "../../types";
import { RakunFlowSnapshot } from "../interface";
import { emitEvents } from "./emitEvents";
import { getCacheState } from "./getCacheState";
import { getSnapshot } from "./getSnapshot";

const recursive = (snapshot: RakunFlowSnapshot, path: string, type: RakunFlowSnapshotStateType): RakunMono<typeof Void> =>
    getCacheState(path, type, snapshot)
        .flatPipe(() => {
            snapshot.reset(path);
            if (snapshot.parent) {
                return recursive(snapshot.parent, path, type)
            } else {
                return mono.then();
            }
        })
        .flatPipe(() => {
            return emitEvents(snapshot)
        });


export const reset = (path: string, type: RakunFlowSnapshotStateType) => (): RakunMono<typeof Void> =>
    getSnapshot()
        .flatPipe(RakunFlowSnapshot => {
            return recursive(RakunFlowSnapshot, path, type);
        })