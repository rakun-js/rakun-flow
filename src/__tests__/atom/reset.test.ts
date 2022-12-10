import { mono } from "rakun";
import atom from "../../atom";
import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";

import { rakunFlowSnapshotProvider } from "../../snapshot/provider";
import { selector } from "../..";

describe('atom set', () => {

    test('atom set', () => {

        const user = atom({
            path: "users",
            default: mono.just({
                name: 'eric'
            })
        })

        const usersPermission = selector({
            path: "users-permission",
            get: user.get().pipe(user => ({
                user,
                rules: 'admin'
            }))
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => usersPermission.get())
            .zipWhen(() => user.set({ name: "ericfillipe" }).then(usersPermission.get()))
            .zipWhen(() => user.reset().then(usersPermission.get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()

        expect(result).toStrictEqual(
            [
                { "user": { "name": "eric" }, "rules": "admin" },
                { "user": { "name": "ericfillipe" }, "rules": "admin" },
                { "user": { "name": "eric" }, "rules": "admin" }
            ]
        );
    });


    test('atom set', () => {

        const user = atom({
            path: "users",
            default: mono.just({
                name: 'eric'
            })
        })

        const usersPermission = atom({
            path: "users-permission",
            default: user.get().pipe(user => ({
                user,
                rules: 'admin'
            }))
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => usersPermission.get())
            .zipWhen(() => user.set({ name: "ericfillipe" }).then(usersPermission.get()))
            .zipWhen(() => user.get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user.reset().then(usersPermission.get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => user.get())
            .pipe(([v1, v2]) => [...v1, v2])
            .zipWhen(() => usersPermission.reset().then(usersPermission.get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()

        expect(result).toStrictEqual([
            {
                "rules": "admin",
                "user": {
                    "name": "eric"
                }
            }, {
                "rules": "admin",
                "user": {
                    "name": "eric"
                }
            }, {
                "name": "ericfillipe"
            }, {
                "rules": "admin",
                "user": {
                    "name": "eric"
                }
            }, {
                "name": "eric"
            },
            {
                "rules": "admin",
                "user": {
                    "name": "eric"
                }
            }]);
    });
});