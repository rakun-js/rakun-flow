import { mono, Void } from "rakun";
import atom from "../../atom";
import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";

describe('atom set', () => {

    test('atom set', () => {

        const user = atom({
            path: "users",
            default: mono.just(1)
        })

        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .zipWhen(() => mono.just(snapshot.states))
            .zipWhen(() => user.set(25))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => mono.just(snapshot.states))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user.get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => mono.just(snapshot.states))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual([
            Void,
            {},
            Void,
            {
                users: {
                    dependencies: [],
                    state: "hasValue",
                    type: "atom",
                    value: 25
                }
            },
            25,
            {
                users: {
                    dependencies: [],
                    state: "hasValue",
                    type: "atom",
                    value: 25
                }
            }
        ]);
    });

});