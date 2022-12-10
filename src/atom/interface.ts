


import { Default, RakunFlowState } from "../types";
export interface RakunFlowAtomStatic {
    <T>(path: RakunFlowAtomBuildConfig<T>): RakunFlowState<T>
}
export type RakunFlowAtomBuildConfig<T> = {
    path: string
    default: Default<T>
}

