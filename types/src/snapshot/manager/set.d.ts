import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotStateType } from "../../types";
export declare const set: <T>(path: string, type: RakunFlowSnapshotStateType) => (value: T) => RakunMono<typeof Void>;
