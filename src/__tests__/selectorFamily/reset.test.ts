import { mono } from "rakun";
import { selectorFamily } from "../..";
import atomFamily from "../../atomFamily";
import param from "../../param";
import { rakunFlowSnapshotProvider } from "../../snapshot/provider";
import { RakunFlowSnapshotImpl } from "../../snapshot/snapshot";


describe('selectorFamily reset', () => {

    test('selectorFamily reset', async () => {
        let index = 0;
        const userIndex = selectorFamily({
            path: "users-permission",
            params: param.string,
            get: (p) => mono.fromCallback(() => {
                return p + (index++)
            })
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => userIndex("123").get())
            .zipWhen(() => userIndex("123").get())
            .zipWhen(() => userIndex("123").reset().then(userIndex("123").get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()

        expect(result).toStrictEqual(
            [
                "1230",
                "1230",
                "1231",
            ]
        );
    });

    test('atom set', async () => {

        const user = atomFamily({
            path: "users/:id",
            params: param.string,
            default: (id) => mono.just({
                name: 'eric',
                id
            })
        })

        const usersPermission = selectorFamily({
            params: param.string,
            path: "users-permission/:id",
            get: (id) => user(id).get().pipe(user => ({
                user,
                id,
                rules: 'admin'
            }))
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => usersPermission("1234").get())
            .zipWhen(() => user("1234").set({ name: "ericfillipe", id: "1234" }).then(usersPermission("1234").get()))
            .zipWhen(() => user("1234").reset().then(usersPermission("1234").get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual(
            [
                {
                    "user": {
                        "name": "eric",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                },
                {
                    "user": {
                        "name": "ericfillipe",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                },
                {
                    "user": {
                        "name": "eric",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                }
            ]
        );

    });

    test('atom set', async () => {

        const user = atomFamily({
            path: "users/:id",
            params: param.string,
            default: (id) => mono.just({
                name: 'eric',
                id
            })
        })

        const usersPermission = atomFamily({
            params: param.string,
            path: "users-permission/:id",
            default: (id) => user(id).get().pipe(user => ({
                user,
                id,
                rules: 'admin'
            }))
        })


        const snapshot = new RakunFlowSnapshotImpl(null);
        const result = rakunFlowSnapshotProvider.define(snapshot)
            .flatPipe(() => usersPermission("1234").get())
            .zipWhen(() => user("1234").set({ name: "ericfillipe", id: "1234" }).then(usersPermission("1234").get()))
            .zipWhen(() => user("1234").reset().then(usersPermission("1234").get()))
            .pipe(([v1, v2]) => [...v1, v2])
            .blockFirst()
        expect(result).toStrictEqual(
            [
                {
                    "user": {
                        "name": "eric",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                },
                {
                    "user": {
                        "name": "eric",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                },
                {
                    "user": {
                        "name": "eric",
                        "id": "1234"
                    },
                    "id": "1234",
                    "rules": "admin"
                }
            ]
        );

    });

});