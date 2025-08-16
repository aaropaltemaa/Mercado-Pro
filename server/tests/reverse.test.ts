import { describe, it, expect } from "vitest";

const reverse = (s: string) => s.split("").reverse().join("");

describe("reverse", () => {
  it("reverse of 'a'", () => {
    expect(reverse("a")).toBe("a");
  });

  it("reverse of 'react'", () => {
    expect(reverse("react")).toBe("tcaer");
  });
});
