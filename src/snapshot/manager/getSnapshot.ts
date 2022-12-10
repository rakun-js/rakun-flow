import { RakunMono } from "rakun"
import { getSnapshotOrThrow, RakunFlowSnapshot, rakunFlowSnapshotProvider } from ".."

export const getSnapshot = (): RakunMono<RakunFlowSnapshot> =>
    rakunFlowSnapshotProvider.get()
            .flatPipe(getSnapshotOrThrow)