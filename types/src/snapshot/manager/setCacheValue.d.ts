import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshot } from "..";
import { RakunFlowSnapshotStateType } from "../../types";
export declare const setCacheValue: (path: string, type: RakunFlowSnapshotStateType, snapshot: RakunFlowSnapshot, value: any) => RakunMono<typeof Void>;
