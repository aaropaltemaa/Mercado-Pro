import { prisma } from "./setup";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "testsecret";
// --- USER HELPERS ---
export async function createUser(data) {
    return prisma.user.create({
        data: {
            name: data?.name ?? "Test User",
            email: data?.email ?? `user_${Date.now()}@test.dev`,
            password: data?.password ?? "hashed",
            role: data?.role ?? "BUYER",
        },
    });
}
export function signToken(user) {
    return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
    });
}
export async function createSellerAndToken() {
    const seller = await createUser({ role: "SELLER" });
    return { seller, token: signToken({ id: seller.id, role: seller.role }) };
}
export async function createBuyerAndToken() {
    const buyer = await createUser({ role: "BUYER" });
    return { buyer, token: signToken({ id: buyer.id, role: buyer.role }) };
}
// --- PRODUCT HELPERS ---
export async function createProductForSeller(sellerId, data) {
    return prisma.product.create({
        data: {
            name: data?.name ?? "Sample Product",
            description: data?.description ?? "Sample description",
            price: data?.price ?? 100,
            image: data?.image ?? "https://placehold.co/400",
            category: data?.category ?? "Other",
            brand: data?.brand ?? "Other",
            sellerId,
        },
    });
}
