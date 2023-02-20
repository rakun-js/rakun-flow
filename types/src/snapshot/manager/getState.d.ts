import { RakunMono } from "rakun";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../../types";
export declare const getState: (path: string, type: RakunFlowSnapshotStateType) => (_get: () => RakunMono<any>) => RakunMono<RakunFlowSnapshotState<any>>;
