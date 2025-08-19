import { describe, it, expect } from "vitest";
import { request } from "./setup";
import {
  createSellerAndToken,
  createProductForSeller,
  createBuyerAndToken,
} from "./factories";
import { prisma } from "./setup";

describe("Products", () => {
  it("GET /products returns an empty list initially", async () => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /products allows SELLER to create a product", async () => {
    const { seller, token } = await createSellerAndToken();

    const res = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Dell U4025QW",
        description: "UltraSharp 40” Curved Monitor",
        price: 1799,
        category: "Monitors",
        brand: "Dell",
        image: "https://placehold.co/600x400",
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: "Dell U4025QW",
      sellerId: seller.id,
      category: "Monitors",
      brand: "Dell",
    });
  });

  it("GET /products returns created products", async () => {
    const { token } = await createSellerAndToken();

    // Create a product as SELLER
    await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "MacBook Pro",
        description: "Apple laptop",
        price: 2499,
        category: "Laptops",
        brand: "Apple",
        image: "https://placehold.co/600x400",
      });

    // Now fetch all products
    const res = await request.get("/products");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({
      name: "MacBook Pro",
      brand: "Apple",
      category: "Laptops",
    });
  });

  it("POST /products fails with 400 if required fields are missing", async () => {
    const { token } = await createSellerAndToken();

    const res = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        // missing name, category, brand etc.
        price: 100,
      });

    expect(res.status).toBe(400);
  });

  it("POST /products forbids BUYER from creating a product", async () => {
    // create a buyer + token
    const { token } = await createBuyerAndToken();

    const res = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Should Not Exist",
        description: "Buyer is not allowed to create",
        price: 100,
        category: "Other",
        brand: "Other",
        image: "https://placehold.co/600x400",
      });

    expect(res.status).toBe(403);
  });

  it("GET /products/:id returns 404 when product does not exist", async () => {
    const res = await request.get("/products/nonexistent_id");
    expect(res.status).toBe(404);
  });

  it("GET /products/:id returns the product by id", async () => {
    const { seller } = await createSellerAndToken();
    const p = await createProductForSeller(seller.id, {
      name: "Logitech MX Keys",
      category: "Accessories",
      brand: "Logitech",
      price: 129,
    });

    const exists = await prisma.product.findUnique({ where: { id: p.id } });
    expect(exists).not.toBeNull();

    const res = await request.get(`/products/${p.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: p.id,
      name: "Logitech MX Keys",
      category: "Accessories",
      brand: "Logitech",
      price: 129,
      sellerId: seller.id,
    });
  });

  it("PUT /products/:id allows the seller to update their own product", async () => {
    const { seller, token } = await createSellerAndToken();
    const product = await createProductForSeller(seller.id, {
      name: "Sony WH-1000XM4",
      category: "Audio",
      brand: "Sony",
      price: 299,
    });

    const res = await request
      .put(`/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Sony WH-1000XM5", // updated
        price: 349, // updated
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: product.id,
      name: "Sony WH-1000XM5",
      price: 349,
      sellerId: seller.id,
    });
  });

  it("PUT /products/:id forbids another seller from updating the product", async () => {
    const { seller: owner } = await createSellerAndToken();
    const product = await createProductForSeller(owner.id, {
      name: "MacBook Air",
      category: "Laptops",
      brand: "Apple",
      price: 1299,
    });

    const { token: otherSellerToken } = await createSellerAndToken();

    const res = await request
      .put(`/products/${product.id}`)
      .set("Authorization", `Bearer ${otherSellerToken}`)
      .send({ name: "Hacked Name" });

    expect(res.status).toBe(403);
  });

  it("DELETE /products/:id allows the seller to delete their own product", async () => {
    const { seller, token } = await createSellerAndToken();
    const product = await createProductForSeller(seller.id, {
      name: "Bose QuietComfort 35 II",
      category: "Audio",
      brand: "Other",
      price: 299,
    });

    const res = await request
      .delete(`/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it("DELETE /products/:id forbids another seller from deleting the product", async () => {
    // First seller creates a product
    const { seller: seller1 } = await createSellerAndToken();
    const product = await createProductForSeller(seller1.id, {
      name: "Nintendo Switch",
      category: "Other",
      brand: "Other",
      price: 299,
    });

    // Second seller tries to delete it
    const { token: seller2Token } = await createSellerAndToken();

    const res = await request
      .delete(`/products/${product.id}`)
      .set("Authorization", `Bearer ${seller2Token}`);

    expect(res.status).toBe(403);
  });
});
