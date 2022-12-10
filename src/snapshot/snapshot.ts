import EventEmitter from "eventemitter3";
import { RakunFlowSnapshot, RakunFlowSnapshotEvents, RakunFlowSnapshotStates } from "./interface";
import produce from "immer";
import { RakunFlowSnapshotState, RakunFlowSnapshotStateType } from "../types";

const getInitialValue = (type: RakunFlowSnapshotStateType): RakunFlowSnapshotState => ({
    type,
    dependencies: [],
    state: "loading",
    value: null,
})
export class RakunFlowSnapshotImpl implements RakunFlowSnapshot {
    public eventEmitter: EventEmitter;

    public states: RakunFlowSnapshotStates = {}
    public events: RakunFlowSnapshotEvents = []
    constructor(public parent: RakunFlowSnapshot | null) {

        this.eventEmitter = new EventEmitter();
    }
    inProcess = false;


    getEvents(): RakunFlowSnapshotEvents {
        return this.events
    }

    setEvents(events: RakunFlowSnapshotEvents): void {
        this.events = events
    }

    getValue(path: string): any | null {
        return this.states[path]?.value
    }

    getState = (path: string, type: RakunFlowSnapshotStateType): RakunFlowSnapshotState => {
        return this.states[path] ?? getInitialValue(type)
    }

    addDependency(path: string, dependency: string, type: RakunFlowSnapshotStateType): void {
        this.states = produce(this.states, draft => {
            draft[path] = produce(draft[path] ?? getInitialValue(type), d => {
                if (!d.dependencies.includes(dependency)) {
                    d.dependencies = [...d.dependencies, dependency]
                }
            })
        })
    }
    hasDependency(path: string, dependency: string): boolean {
        const dependencies: string[] = this.states[path]?.dependencies ?? []
        return dependencies.includes(dependency)
    }
    set(path: string, value: any, type: RakunFlowSnapshotStateType): void {
        const [data, events] = produce([this.states, this.events], draft => {
            this._recipeSet(path, value, draft, type)
        })
        this.states = data
        this.events = events
    }
    getDependencies(path: string): string[] {
        return this.states[path]?.dependencies ?? []
    }
    _recipeReset(path: string, [states, events]: [RakunFlowSnapshotStates, RakunFlowSnapshotEvents]) {
        if (path in states) {
            states[path] = produce(states[path], d => {
                d.state = "loading";
                d.value = null;
            })
        }
        for (const p of states[path]?.dependencies ?? []) {
            if (states[p]?.type == 'selector') {
                this._recipeReset(p, [states, events])
            }
        }
        events.push([path, states[path]])
    }

    _recipeSet(path: string, value: any, [states, events]: [RakunFlowSnapshotStates, RakunFlowSnapshotEvents], type: RakunFlowSnapshotStateType) {
        states[path] = produce(states[path] ?? getInitialValue(type), d => {
            d.state = "hasValue"
            d.value = value as any
        })
        const dependencies = states[path]?.dependencies ?? []
        for (const p of dependencies) {
            if (states[p]?.type == 'selector') {

                this._recipeReset(p, [states, events])
            }
        }
        events.push([path, states[path]])
    }
    reset(path: string) {
        const [states, events] = produce([this.states, this.events], draft => {
            this._recipeReset(path, draft)
        })
        this.states = states
        this.events = events
    }

}