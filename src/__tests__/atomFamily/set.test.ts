import { mono, Void } from "rakun";
import atomFamily from "../../atomFamily";
import param from "../../param";

import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";


describe('atom set', () => {

    const user = atomFamily({
        path: "users/:userId",
        params: param.string,
        default: (userId) => mono.just(userId + 1)
    })
    test('atom set', async () => {


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .zipWhen(() => mono.just(snapshot.states))
            .zipWhen(() => user("test").set("25"))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => mono.just(snapshot.states))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user("test").get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => mono.just(snapshot.states))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual(
            [
                Void,
                {},
                Void,
                {
                    'users/test': {
                        dependencies: [],
                        state: "hasValue",
                        type: "atom",
                        value: "25"
                    }
                },
                "25",
                {
                    'users/test': {
                        dependencies: [],
                        state: "hasValue",
                        type: "atom",
                        value: "25"
                    }
                }
            ]
        );
    });

});