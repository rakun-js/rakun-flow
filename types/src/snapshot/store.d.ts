import { ZoldyStoreState } from "../types";
import { ZoldyStore, ZoldyStoreEvents, ZoldyStoreStates } from "./interface";
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
