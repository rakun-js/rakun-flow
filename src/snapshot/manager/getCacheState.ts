import { mono, RakunMono } from "rakun";
import { RakunFlowSnapshot } from "..";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../../types";

export const getCacheState = (path: string, type: RakunFlowSnapshotStateType, snapshot: RakunFlowSnapshot): RakunMono<RakunFlowSnapshotState> =>
    mono.just(snapshot.getState(path, type))
        .flatPipe((state) => {
            if (state.state != 'hasValue' && snapshot.parent) {
                return getCacheState(path, type, snapshot.parent);
            }
            return mono.just(snapshot.getState(path, type))
        });
