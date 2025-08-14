import { describe, it, expect } from "vitest";
import { request } from "./setup";
import {
  createSellerAndToken,
  createBuyerAndToken,
  createProductForSeller,
} from "./factories";

describe("Products", () => {
  it("SELLER can create a product", async () => {
    const { seller, token } = await createSellerAndToken();

    const res = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Dell U4025QW",
        description: "40-inch ultrawide monitor",
        price: 1899,
        image: "https://i.dell.com/...",
        category: "Monitors",
        brand: "Dell",
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: "Dell U4025QW",
      sellerId: seller.id,
      category: "Monitors",
      brand: "Dell",
    });
  });

  it("BUYER is forbidden to create a product", async () => {
    const { token } = await createBuyerAndToken();

    const res = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Illegal",
        description: "Nope",
        price: 10,
        image: "x",
        category: "Laptops",
        brand: "Apple",
      });

    expect(res.status).toBe(403);
  });
});
