import { describe, expect, it } from "bun:test";
import { app, response, url } from ".";

describe("test", () => {
    it("fetches the session data", async () => {
        const success = await app.handle(new Request(url));

        expect(
            await success.json()
        ).toEqual(
            JSON.parse(JSON.stringify(response))
        );
    });
})
