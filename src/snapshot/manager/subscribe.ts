import { mono, RakunMono, Void } from "rakun"
import { RakunFlowSnapshotState } from "../../types"
import { getSnapshot } from "./getSnapshot"
export const subscribe = (path: string) => (callback: (value: RakunFlowSnapshotState) => void): RakunMono<() => RakunMono<typeof Void>> => {
    return getSnapshot()
        .flatPipe(snapshot => {
            return mono.fromCallback(() => {
                snapshot.eventEmitter.on(path, callback)
                return callback
            }).flatPipe((cb) => {
                return mono.just(() => {
                    snapshot.eventEmitter.removeListener(path, cb);
                    return mono.then();
                })
            })
        })
}