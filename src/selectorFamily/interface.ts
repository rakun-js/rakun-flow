import { Fields } from "../param/interface";
import { SetFamily, GetFamily, RakunFlowValue, RakunFlowState } from "../types";

export type RakunFlowSelectorFamilyBuildConfigReadOnly<P, T> = {
    path: string
    params: Fields<P>
    get: GetFamily<P, T>
}
export type RakunFlowSelectorFamilyBuildConfig<P, T> = {
    set: SetFamily<P, T>
} & RakunFlowSelectorFamilyBuildConfigReadOnly<P, T>


export type RakunFlowSelectorFamilyStatic = {
    <P, T>(config: RakunFlowSelectorFamilyBuildConfigReadOnly<P, T>): (params: P) => RakunFlowValue<T>
    <P, T>(config: RakunFlowSelectorFamilyBuildConfig<P, T>): (params: P) => RakunFlowState<T>
}