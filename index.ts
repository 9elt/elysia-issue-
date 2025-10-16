import { Value } from "@sinclair/typebox/value";
import { Elysia, t } from "elysia";

const tResponse = t.Object({
    a: t.Date(),
    b: t.Object({
        c: t.Union([
            t.Null(),
            t.Object({
                d: t.Array(
                    t.Object({
                        e: t.Object({
                            f: t.Union([
                                t.Literal("A"),
                                t.Literal("B"),
                            ]),
                        }),
                    }),
                ),
            })
        ]),
    }),
    g: t.Array(
        t.Object({
            h: t.String(),
        }),
    ),
});

export const response = {
    a: new Date(),
    b: {
        c: null
    },
    g: [
        {
            h: "6891b38e-371e-4e2d-9ef7-1d458e3d6d36"
        }
    ]
};

export const app = new Elysia()
    .onError(({ error }) => JSON.stringify(error))
    .get(
        "/",
        async () => {
            // NOTE: typebox assert succeeds
            Value.Assert(tResponse, response);

            return response;
        },
        {
            response: tResponse
        },
    )
    .listen(4000);


export const url = `http://${app.server?.hostname}:${app.server?.port}`;
