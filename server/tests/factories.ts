import { prisma } from "./setup";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "testsecret";

export async function createUser(overrides?: {
  name?: string;
  email?: string;
  password?: string;
  role?: "BUYER" | "SELLER" | "ADMIN";
}) {
  return prisma.user.create({
    data: {
      name: overrides?.name ?? "Test User",
      email: overrides?.email ?? `user_${Date.now()}@test.dev`,
      password: overrides?.password ?? "hashed",
      role: overrides?.role ?? "BUYER",
    },
  });
}

export function signToken(user: { id: string; role: string }) {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export async function createSellerAndToken() {
  const seller = await createUser({
    role: "SELLER",
    email: `seller_${Date.now()}@demo.dev`,
  });
  return { seller, token: signToken({ id: seller.id, role: "SELLER" }) };
}

export async function createBuyerAndToken() {
  const buyer = await createUser({
    role: "BUYER",
    email: `buyer_${Date.now()}@demo.dev`,
  });
  return { buyer, token: signToken({ id: buyer.id, role: "BUYER" }) };
}

export async function createProductForSeller(
  sellerId: string,
  data?: Partial<{
    name: string;
    description: string;
    price: number;
    image: string;
    category: any;
    brand: any;
  }>
) {
  return prisma.product.create({
    data: {
      name: data?.name ?? "Sample Product",
      description: data?.description ?? "Sample description",
      price: data?.price ?? 199,
      image: data?.image ?? "https://placehold.co/600x400",
      category: data?.category ?? "Laptops",
      brand: data?.brand ?? "Other",
      sellerId,
    },
  });
}
