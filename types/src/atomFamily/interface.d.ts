import { Fields } from "../param/interface";
import { DefaultFamily, RakunFlowState } from "../types";
export type RakunFlowAtomFamilyBuildConfig<P, T> = {
    path: string;
    params: Fields<P>;
    default: DefaultFamily<P, T>;
};
export type RakunFlowAtomFamilyStatic = {
    <P, T>(config: RakunFlowAtomFamilyBuildConfig<P, T>): (params: P) => RakunFlowState<T>;
};
