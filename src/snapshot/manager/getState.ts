import { mono, RakunMono, Void } from "rakun";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../../types";
import { RakunFlowSnapshot } from "../interface";
import { rakunFlowPathParentProvider } from "../provider";
import { emitEvents } from "./emitEvents";
import { getCacheState } from "./getCacheState";
import { getSnapshot } from "./getSnapshot";
import { setCacheValue } from "./setCacheValue";



const addDependency = (snapshot: RakunFlowSnapshot, path: string, dependency: string, type: RakunFlowSnapshotStateType): RakunMono<typeof Void> =>
    mono.fromCallback(() => {
        snapshot.addDependency(path, dependency, type)
        return Void
    })



const get = (snapshot: RakunFlowSnapshot, path: string, get: () => RakunMono<any>, type: RakunFlowSnapshotStateType): RakunMono<typeof Void> =>
    rakunFlowPathParentProvider.get()
        .flatPipe(value => {
            if (value) {
                return addDependency(snapshot, path, value, type)
                    .thenReturn(value)
            }
            return mono.just(value)
        })
        .flatPipe((oldPathParent) => {
            return rakunFlowPathParentProvider.define(path)
                .then(get()
                    .flatPipe((v) =>
                        setCacheValue(path, type, snapshot, v)
                            .then(rakunFlowPathParentProvider.define(oldPathParent))
                    ))
        })
        .flatPipe(() => {
            return emitEvents(snapshot)
        });


export const getState = (path: string, type: RakunFlowSnapshotStateType) => (_get: () => RakunMono<any>): RakunMono<RakunFlowSnapshotState<any>> =>
    getSnapshot()
        .flatPipe(snapshot => {
            return getCacheState(path, type, snapshot)
                .flatPipe((state) => {
                    if (state.state == "hasValue") {
                        return mono.just(state)
                    } else {
                        return get(snapshot, path, _get, type)
                            .then(getCacheState(path, type, snapshot));
                    }
                });
        })
