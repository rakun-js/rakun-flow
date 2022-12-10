import { mono } from "rakun";
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
    test('atom set', () => {

        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => user("123").get())
            .zipWhen(() => user("123").set("652").then(user("123").get()))
            .zipWhen(() => user("123").reset().then(user("123").get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()

        expect(result).toStrictEqual([
            "1231",
            "652",
            "1231",
        ]);
    });

});