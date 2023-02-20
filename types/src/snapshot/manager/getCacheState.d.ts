import { RakunMono } from "rakun";
import { RakunFlowSnapshot } from "..";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../../types";
export declare const getCacheState: (path: string, type: RakunFlowSnapshotStateType, snapshot: RakunFlowSnapshot) => RakunMono<RakunFlowSnapshotState>;
