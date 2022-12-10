import { mono } from "rakun";

import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";
import { RakunFlowSnapshotState } from "../../types";
import selector from "../../selector";

describe('selector reset', () => {

    test('selector reset', async () => {

        let index = 0;
        const userIndex = selector({
            path: "users-permission",
            get: mono.fromCallback(() => {
                return index++
            })
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const items: RakunFlowSnapshotState[] = []
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .zipWhen(() => userIndex.subscribe((e) =>
                items.push(e)
            ))
            .flatPipe(() => userIndex.get())
            .zipWhen(() => userIndex.get())
            .zipWhen(() => userIndex.reset().then(userIndex.get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()

        expect(result).toStrictEqual(
            [
                0,
                0,
                1
            ]
        );

        expect(items).toStrictEqual(
            [
                {
                    "dependencies": [],
                    "state": "hasValue",
                    "type": "selector",
                    "value": 0,
                },
                {
                    "dependencies": [],
                    "state": "loading",
                    "type": "selector",
                    "value": null,
                },
                {
                    "dependencies": [],
                    "state": "hasValue",
                    "type": "selector",
                    "value": 1,
                }
            ]
        );
    });

});