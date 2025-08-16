import { describe, it, expect } from "vitest";
import { request } from "./setup";
import { createSellerAndToken, createProductForSeller } from "./factories";

describe("Products", () => {
  it("returns a list of products", async () => {
    const { seller } = await createSellerAndToken();
    await createProductForSeller(seller.id, {
      name: "MacBook Pro",
      category: "Laptops",
      brand: "Apple",
    });
    await createProductForSeller(seller.id, {
      name: "Samsung Monitor",
      category: "Monitors",
      brand: "Samsung",
    });

    const res = await request.get("/products");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("brand");
  });
});
