import { describe, it, expect } from "vitest";
import { request } from "./setup";

describe("Auth", () => {
  it("POST /auth/register creates a new user", async () => {
    const res = await request.post("/auth/register").send({
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      role: "BUYER",
    });

    console.log("REGISTER RESPONSE:", res.body, res.status);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "User registered successfully.",
      user: {
        email: "newuser@example.com",
        role: "BUYER",
      },
    });
    expect(res.body.user).toHaveProperty("id");
  });

  it("POST /auth/login returns a token for valid credentials", async () => {
    // First register a user
    await request.post("/auth/register").send({
      name: "Login User",
      email: "loginuser@example.com",
      password: "password123",
      role: "BUYER",
    });

    // Then log in
    const res = await request.post("/auth/login").send({
      email: "loginuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body).toMatchObject({
      user: {
        email: "loginuser@example.com",
        role: "BUYER",
      },
    });
  });
  it("POST /auth/login fails with 401 for wrong password", async () => {
    // Register a different user
    await request.post("/auth/register").send({
      name: "Wrong Pw User",
      email: "wrongpw@example.com",
      password: "correct-pass",
      role: "BUYER",
    });

    // Attempt login with wrong password
    const res = await request.post("/auth/login").send({
      email: "wrongpw@example.com",
      password: "wrong-pass",
    });

    expect(res.status).toBe(401);
  });

  it("rejects requests without a token", async () => {
    const res = await request.post("/products").send({
      name: "Should Fail",
      description: "No token here",
      price: 100,
      category: "Test",
      brand: "Test",
      image: "https://placehold.co/600x400",
    });
    expect(res.status).toBe(401);
  });

  it("rejects requests with an invalid token", async () => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer totally.fake.token")
      .send({
        name: "Invalid Token Product",
        price: 50,
        category: "Misc",
        brand: "BrandX",
      });

    expect(res.status).toBe(401);
  });
});
