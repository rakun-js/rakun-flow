import { mono, Void } from "rakun";
import { selector } from "../..";
import atom from "../../atom";

import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";

describe('selector set', () => {

    test('selector set', async () => {

        const userData = atom({
            path: "users-data",
            default: mono.just(1)
        })

        const user = selector({
            path: "users",
            get: userData.get(),
            set: (v: number) => userData.set(v),
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => user.get())
            .zipWhen(() => user.set(25))
            .zipWhen(() => user.get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => userData.set(8))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user.get())
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual(
            [1, Void, 25, Void, 8]
        );
    });

});