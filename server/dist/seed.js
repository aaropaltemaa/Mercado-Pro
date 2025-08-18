"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedProductData_1 = require("./seedProductData");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // Reset DB
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    // Create 1 seller
    const passwordHash = await bcryptjs_1.default.hash("password123", 10);
    const seller = await prisma.user.create({
        data: {
            name: "Tech Seller",
            email: "seller@demo.dev",
            password: passwordHash,
            role: client_1.Role.SELLER,
        },
    });
    // Create 1 buyer
    const buyer = await prisma.user.create({
        data: {
            name: "Tech Buyer",
            email: "buyer@demo.dev",
            password: passwordHash,
            role: client_1.Role.BUYER,
        },
    });
    console.log("Demo accounts:");
    console.log("  Seller -> seller@demo.dev / password123");
    console.log("  Buyer  -> buyer@demo.dev  / password123");
    // Insert curated products
    for (const product of seedProductData_1.seedProductData) {
        await prisma.product.create({
            data: {
                ...product,
                sellerId: seller.id,
                averageRating: 0,
                reviewsCount: 0,
            },
        });
    }
    console.log("✅ Seed complete.");
}
main()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
