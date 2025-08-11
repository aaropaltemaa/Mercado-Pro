// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedProductData } from "./seedProductData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Reset DB
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create 1 seller
  const passwordHash = await bcrypt.hash("password123", 10);
  const seller = await prisma.user.create({
    data: {
      name: "Tech Seller",
      email: "seller@demo.dev",
      password: passwordHash,
      role: Role.SELLER,
    },
  });

  // Insert curated products
  for (const product of seedProductData) {
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
