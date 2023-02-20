import EventEmitter from "eventemitter3";
import { RakunMono, Void } from "rakun";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../types";
export type GetParams = {
    path: string;
    get: () => RakunMono<any>;
};
export type SetParams = {
    path: string;
    value: any;
};
export type RakunFlowSnapshotManager = {
    set(value: any): RakunMono<typeof Void>;
    reset(): RakunMono<typeof Void>;
    subscribe(callback: (value: RakunFlowSnapshotState) => void): RakunMono<() => RakunMono<typeof Void>>;
    getState(get: () => RakunMono<any>): RakunMono<RakunFlowSnapshotState<any>>;
};
export interface RakunFlowSnapshot {
    eventEmitter: EventEmitter;
    parent: RakunFlowSnapshot | null;
    setEvents(events: RakunFlowSnapshotEvents): void;
    getEvents(): RakunFlowSnapshotEvents;
    set(path: string, value: any, type: RakunFlowSnapshotStateType): void;
    reset(path: string): void;
    addDependency(path: string, dependency: string, type: RakunFlowSnapshotStateType): void;
    states: RakunFlowSnapshotStates;
    events: RakunFlowSnapshotEvents;
    getState(path: string, type: RakunFlowSnapshotStateType): RakunFlowSnapshotState;
    hasDependency(path: string, dependency: string): boolean;
    getDependencies(path: string): string[];
}
export interface RakunFlowSnapshotStates {
    [path: string]: RakunFlowSnapshotState;
}
export type RakunFlowSnapshotEvents = [string, RakunFlowSnapshotState][];
export type EventType = "reset" | "set" | "addDependency";
