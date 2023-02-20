import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotState } from "../../types";
export declare const subscribe: (path: string) => (callback: (value: RakunFlowSnapshotState) => void) => RakunMono<() => RakunMono<typeof Void>>;
