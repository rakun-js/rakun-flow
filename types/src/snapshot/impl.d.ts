import { RakunMono, Void, RakunFlux } from "rakun";
import { EventEmitter } from 'eventemitter3';
import { GetParams, SetParams, ZoldySnapshot, ZoldyStore, ZoldyStoreEvents, ZoldyStoreStates } from "./interface";
import { ZoldyStoreState } from "../types";
export declare class ZoldyStoreImpl implements ZoldyStore {
    states: ZoldyStoreStates;
    events: ZoldyStoreEvents;
    inProcess: boolean;
    constructor(states?: ZoldyStoreStates, events?: ZoldyStoreEvents);
    getEvents(): ZoldyStoreEvents;
    setEvents(events: ZoldyStoreEvents): void;
    getValue(path: string): any | null;
    getState: (path: string) => ZoldyStoreState;
    addDependency(path: string, dependency: string): void;
    hasDependency(path: string, dependency: string): boolean;
    set(path: string, value: any): void;
    getDependencies(path: string): string[];
    setDependency(path: string, dependencies: string[]): void;
    _recipeReset(path: string, [data, events]: [ZoldyStoreStates, ZoldyStoreEvents]): void;
    _recipeSet(path: string, value: any, [states, events]: [ZoldyStoreStates, ZoldyStoreEvents]): void;
    reset(path: string): void;
}
export declare class ZoldySnapshotImpl implements ZoldySnapshot {
    cache: ZoldyStore;
    parent: ZoldySnapshot | null;
    eventEmitter: EventEmitter;
    constructor(cache: ZoldyStore, parent: ZoldySnapshot | null);
    reset(path: string): RakunMono<typeof Void>;
    emitEvents(): RakunMono<typeof Void>;
    addDependency(path: string, dependency: string): RakunMono<typeof Void>;
    hasDependency(path: string, dependency: string): RakunMono<boolean>;
    getDependencies(path: string): RakunFlux<string>;
    setCacheValue(path: string, value: any): RakunMono<typeof Void>;
    getCacheState(path: string): RakunMono<ZoldyStoreState>;
    getState({ get, path }: GetParams): RakunMono<ZoldyStoreState>;
    private _get;
    subscribe(path: string, callback: (value: ZoldyStoreState) => void): RakunMono<() => RakunMono<typeof Void>>;
    set({ path, value }: SetParams): RakunMono<typeof Void>;
}
