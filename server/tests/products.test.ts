import { describe, it, expect } from "vitest";
import { request } from "./setup";

describe("health", () => {
  it("returns ok", async () => {
    const res = await request.get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
