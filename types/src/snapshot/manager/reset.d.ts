import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotStateType } from "../../types";
export declare const reset: (path: string, type: RakunFlowSnapshotStateType) => () => RakunMono<typeof Void>;
