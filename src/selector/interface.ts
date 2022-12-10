
import { RakunMono, Void } from "rakun";
import { Get, Set, RakunFlowState, RakunFlowSnapshotState, RakunFlowValue } from "../types";


export type RakunFlowSelectorBuildConfigReadOnly<T> = {
    path: string
    get: Get<T>
}
export type RakunFlowSelectorBuildConfig<T> = {
    set: Set<T>
} & RakunFlowSelectorBuildConfigReadOnly<T>


export interface RakunFlowSelectorStatic {
    <T>(path: RakunFlowSelectorBuildConfigReadOnly<T>): RakunFlowValue<T>
    <T>(path: RakunFlowSelectorBuildConfig<T>): RakunFlowState<T>
}

export interface RakunFlowSelectorManager {

    reset(path: string): RakunMono<typeof Void>
    subscribe(path: string, callback: (value: RakunFlowSnapshotState) => void): RakunMono<() => RakunMono<typeof Void>>
    getState(path: string, get: () => RakunMono<any>): RakunMono<RakunFlowSnapshotState<any>>


}