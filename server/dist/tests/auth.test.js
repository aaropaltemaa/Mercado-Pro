"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const setup_1 = require("./setup");
(0, vitest_1.describe)("Auth", () => {
    (0, vitest_1.it)("POST /auth/register creates a new user", async () => {
        const res = await setup_1.request.post("/auth/register").send({
            name: "New User",
            email: "newuser@example.com",
            password: "password123",
            role: "BUYER",
        });
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body).toMatchObject({
            message: "User registered successfully.",
            user: {
                email: "newuser@example.com",
                role: "BUYER",
            },
        });
        (0, vitest_1.expect)(res.body.user).toHaveProperty("id");
    });
    (0, vitest_1.it)("POST /auth/login returns a token for valid credentials", async () => {
        // First register a user
        await setup_1.request.post("/auth/register").send({
            name: "Login User",
            email: "loginuser@example.com",
            password: "password123",
            role: "BUYER",
        });
        // Then log in
        const res = await setup_1.request.post("/auth/login").send({
            email: "loginuser@example.com",
            password: "password123",
        });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body).toHaveProperty("token");
        (0, vitest_1.expect)(typeof res.body.token).toBe("string");
        (0, vitest_1.expect)(res.body).toMatchObject({
            user: {
                email: "loginuser@example.com",
                role: "BUYER",
            },
        });
    });
    (0, vitest_1.it)("POST /auth/login fails with 401 for wrong password", async () => {
        // Register a different user
        await setup_1.request.post("/auth/register").send({
            name: "Wrong Pw User",
            email: "wrongpw@example.com",
            password: "correct-pass",
            role: "BUYER",
        });
        // Attempt login with wrong password
        const res = await setup_1.request.post("/auth/login").send({
            email: "wrongpw@example.com",
            password: "wrong-pass",
        });
        (0, vitest_1.expect)(res.status).toBe(401);
    });
    (0, vitest_1.it)("rejects requests without a token", async () => {
        const res = await setup_1.request.post("/products").send({
            name: "Should Fail",
            description: "No token here",
            price: 100,
            category: "Test",
            brand: "Test",
            image: "https://placehold.co/600x400",
        });
        (0, vitest_1.expect)(res.status).toBe(401);
    });
    (0, vitest_1.it)("rejects requests with an invalid token", async () => {
        const res = await setup_1.request
            .post("/products")
            .set("Authorization", "Bearer totally.fake.token")
            .send({
            name: "Invalid Token Product",
            price: 50,
            category: "Misc",
            brand: "BrandX",
        });
        (0, vitest_1.expect)(res.status).toBe(401);
    });
});
