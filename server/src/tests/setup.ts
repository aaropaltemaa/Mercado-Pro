import { beforeAll, afterAll, beforeEach, expect } from "vitest";
import { PrismaClient } from "@prisma/client";
import supertest from "supertest";
import app from "../app";
if (!process.env.DATABASE_URL?.includes("test.db")) {
  // Fail fast if tests aren't pointed at test DB
  throw new Error("DATABASE_URL must point to test.db when running tests");
}

// share these in tests
export const prisma = new PrismaClient();
export const request = supertest(app);

// simple FK-safe wipe using model APIs
async function clearDb() {
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
}

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});
