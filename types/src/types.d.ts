import { RakunMono, Void } from "rakun";
export declare abstract class RakunFlowValue<T> {
    abstract path: string;
    abstract get(): RakunMono<T>;
    abstract getState(): RakunMono<RakunFlowSnapshotState<T>>;
    abstract reset(): RakunMono<typeof Void>;
    abstract subscribe(callback: (value: RakunFlowSnapshotState<T>) => void): RakunMono<() => RakunMono<typeof Void>>;
}
export declare abstract class RakunFlowState<T> extends RakunFlowValue<T> {
    abstract set(value: T): RakunMono<typeof Void>;
}
export type RakunFlowSnapshotStateType = 'atom' | 'selector';
export type RakunFlowSnapshotState<T = any> = {
    type: RakunFlowSnapshotStateType;
    value: T;
    state: "hasValue" | "loading";
    dependencies: string[];
};
export type Default<T> = RakunMono<T>;
export type DefaultFamily<P, T> = (params: P) => RakunMono<T>;
export type Get<T> = RakunMono<T>;
export type Set<T> = (value: T) => RakunMono<typeof Void>;
export type GetFamily<P, T> = (params: P) => RakunMono<T>;
export type SetFamily<P, T> = (params: P, value: T) => RakunMono<typeof Void>;
