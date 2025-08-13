import { beforeAll, afterAll, beforeEach } from "vitest";
import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "../src/app";

export const prisma = new PrismaClient();
export const request = supertest(app);

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
