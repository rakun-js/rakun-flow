import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotStateType } from "../../types";
import { emitEvents } from "./emitEvents";
import { getSnapshot } from "./getSnapshot";
import { setCacheValue } from "./setCacheValue";

export const set = <T>(path: string, type: RakunFlowSnapshotStateType) => (value: T): RakunMono<typeof Void> => {
    return getSnapshot()
        .flatPipe(snapshot => {
            return setCacheValue(path, type, snapshot, value)
                .then()
                .flatPipe(() => {
                    return emitEvents(snapshot)
                });
        })
}
