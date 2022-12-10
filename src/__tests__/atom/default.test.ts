import { mono } from "rakun";
import atom from "../../atom";
import { rakunFlowSnapshotProvider } from "../../snapshot";
import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";


describe('atom set', () => {

    test('atom set', () => {

        const user = atom({
            path: "users",
            default: mono.just(1)
        })

        const snapshot = new RakunFlowSnapshotImpl(null);


        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => user.get())
            .zipWhen(() => user.set(124).then(user.get()))
            .zipWhen(() => user.reset().then(user.get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual([
            1,
            124,
            1
        ]);
    });

});