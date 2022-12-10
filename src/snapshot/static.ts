
import { mono, RakunMono } from "rakun";
import { RakunFlowSnapshot } from "./interface";
import { RakunFlowSnapshotImpl } from "./snapshot";


export const getSnapshotOrThrow = (RakunFlowSnapshot: RakunFlowSnapshot | null): RakunMono<RakunFlowSnapshot> => {
    return RakunFlowSnapshot != null ?
        mono.just(RakunFlowSnapshot) :
        mono.error(new Error("NotFound RakunFlowSnapshot"));
}
export const createSnapshot = (parent: RakunFlowSnapshot | null): RakunFlowSnapshot => {
    return new RakunFlowSnapshotImpl(parent);
}
