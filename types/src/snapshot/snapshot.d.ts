import EventEmitter from "eventemitter3";
import { RakunFlowSnapshot, RakunFlowSnapshotEvents, RakunFlowSnapshotStates } from "./interface";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../types";
export declare class RakunFlowSnapshotImpl implements RakunFlowSnapshot {
    parent: RakunFlowSnapshot | null;
    eventEmitter: EventEmitter;
    states: RakunFlowSnapshotStates;
    events: RakunFlowSnapshotEvents;
    constructor(parent: RakunFlowSnapshot | null);
    inProcess: boolean;
    getEvents(): RakunFlowSnapshotEvents;
    setEvents(events: RakunFlowSnapshotEvents): void;
    getValue(path: string): any | null;
    getState: (path: string, type: RakunFlowSnapshotStateType) => RakunFlowSnapshotState;
    addDependency(path: string, dependency: string, type: RakunFlowSnapshotStateType): void;
    hasDependency(path: string, dependency: string): boolean;
    set(path: string, value: any, type: RakunFlowSnapshotStateType): void;
    getDependencies(path: string): string[];
    _recipeReset(path: string, [states, events]: [RakunFlowSnapshotStates, RakunFlowSnapshotEvents]): void;
    _recipeSet(path: string, value: any, [states, events]: [RakunFlowSnapshotStates, RakunFlowSnapshotEvents], type: RakunFlowSnapshotStateType): void;
    reset(path: string): void;
}
