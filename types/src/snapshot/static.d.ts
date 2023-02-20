import { RakunMono } from "rakun";
import { RakunFlowSnapshot } from "./interface";
export declare const getSnapshotOrThrow: (RakunFlowSnapshot: RakunFlowSnapshot | null) => RakunMono<RakunFlowSnapshot>;
export declare const createSnapshot: (parent: RakunFlowSnapshot | null) => RakunFlowSnapshot;
