import { mono, RakunMono, Void } from "rakun";
import { RakunFlowSnapshot } from "../interface";

export const emitEvents = (snapshot: RakunFlowSnapshot): RakunMono<typeof Void> => {
    const events = snapshot.getEvents()
    events.forEach(e => snapshot.eventEmitter.emit(e[0], e[1]))
    snapshot.setEvents([]);
    return mono.then();
}