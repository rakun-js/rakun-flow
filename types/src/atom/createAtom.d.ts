import { Default } from "../types";
import { RakunFlowAtomStatic } from "./interface";
export type Config<T> = {
    path: string;
    default: () => Default<T>;
};
export declare const createAtom: RakunFlowAtomStatic;
