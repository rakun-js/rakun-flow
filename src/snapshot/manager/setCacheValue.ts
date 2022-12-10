import { mono, RakunMono, Void } from "rakun";
import { RakunFlowSnapshot } from "..";
import { RakunFlowSnapshotStateType } from "../../types";
export const setCacheValue = (path: string, type: RakunFlowSnapshotStateType, snapshot: RakunFlowSnapshot, value: any): RakunMono<typeof Void> => {
    return mono.fromCallback(() => {
        snapshot.set(path, value, type)
        return Void
    });
}
