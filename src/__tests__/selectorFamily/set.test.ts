import { mono, Void } from "rakun";
import { selectorFamily } from "../..";
import atomFamily from "../../atomFamily";
import param from "../../param";

import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";

describe('selectorFamily set', () => {

    test('selectorFamily set', async () => {

        const userData = atomFamily({
            path: "users-data/:userId",
            params: param.string,
            default: (p) => mono.just(1 + p)
        })

        const user = selectorFamily({
            path: "users",
            params: param.string,
            get: (p) => userData(p).get(),
            set: (p: string, v: string) => userData(p).set(v),
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => user("123").get())
            .zipWhen(() => user("123").set("225"))
            .zipWhen(() => user("123").get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => userData("123").set("8"))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user("123").get())
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual(
            ["1123", Void, "225", Void, "8"]
        );
    });

});