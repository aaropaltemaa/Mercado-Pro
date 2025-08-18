"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.signToken = signToken;
exports.createSellerAndToken = createSellerAndToken;
exports.createBuyerAndToken = createBuyerAndToken;
exports.createProductForSeller = createProductForSeller;
const setup_1 = require("./setup");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "testsecret";
// --- USER HELPERS ---
async function createUser(data) {
    return setup_1.prisma.user.create({
        data: {
            name: data?.name ?? "Test User",
            email: data?.email ?? `user_${Date.now()}@test.dev`,
            password: data?.password ?? "hashed",
            role: data?.role ?? "BUYER",
        },
    });
}
function signToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
    });
}
async function createSellerAndToken() {
    const seller = await createUser({ role: "SELLER" });
    return { seller, token: signToken({ id: seller.id, role: seller.role }) };
}
async function createBuyerAndToken() {
    const buyer = await createUser({ role: "BUYER" });
    return { buyer, token: signToken({ id: buyer.id, role: buyer.role }) };
}
// --- PRODUCT HELPERS ---
async function createProductForSeller(sellerId, data) {
    return setup_1.prisma.product.create({
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
