import express from "express";
import { prisma } from "../prisma";
import { authenticate } from "../middleware/auth";
import { Category } from "@prisma/client";
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();

  res.json(products);
});

router.get("/my", authenticate, async (req, res) => {
  const user = req.user;

  if (!user || user.role !== "SELLER") {
    return res.status(403).json({ error: "Only sellers can access this." });
  }

  const products = await prisma.product.findMany({
    where: { sellerId: user.userId },
  });

  res.json(products);
});

// Create a product
router.post("/", authenticate, async (req, res) => {
  const { name, description, price, image, category, brand } = req.body;
  const user = req.user;

  if (!user || user.role !== "SELLER") {
    return res.status(403).json({ error: "Only sellers can create products." });
  }

  if (!name || !category || !brand || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      image,
      category,
      brand,
      sellerId: user.userId,
    },
  });

  res.status(201).json(product);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res.status(404).json({ error: "Product doesn't exist" });
  }

  res.json(product);
});

// GET /products/:id/reviews?page=1&pageSize=10
router.get("/:id/reviews", async (req, res) => {
  const productId = req.params.id;

  // parse & guard pagination
  const page = Math.max(
    1,
    Number.parseInt((req.query.page as string) ?? "1", 10)
  );
  const pageSize = Math.min(
    50,
    Math.max(1, Number.parseInt((req.query.pageSize as string) ?? "10", 10))
  );
  const skip = (page - 1) * pageSize;

  // ensure product exists
  const exists = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, averageRating: true, reviewsCount: true },
  });
  if (!exists) return res.status(404).json({ error: "Product not found." });

  // total count (for pagination UI)
  const total = await prisma.review.count({ where: { productId } });

  // fetch page of reviews, newest first, include reviewer name
  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
    include: {
      user: { select: { id: true, name: true } },
    },
  });

  return res.json({
    reviews,
    page,
    pageSize,
    total,
    averageRating: exists.averageRating ?? 0,
    reviewsCount: exists.reviewsCount ?? total,
  });
});

router.post("/:id/reviews", authenticate, async (req, res) => {
  const productId = req.params.id;
  const user = req.user;
  const { rating, comment } = req.body as { rating: number; comment?: string };

  // Auth & role
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "BUYER") {
    return res.status(403).json({ error: "Only buyers can create reviews." });
  }

  // Validate rating
  if (
    typeof rating !== "number" ||
    Number.isNaN(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return res
      .status(400)
      .json({ error: "Rating must be a number between 1 and 5." });
  }

  // Ensure product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return res.status(404).json({ error: "Product not found." });

  // verify the user has purchased this product
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: { userId: user.userId, status: { in: ["PAID", "PENDING"] } }, // tune this rule if needed
    },
  });
  if (!hasPurchased) {
    return res
      .status(403)
      .json({ error: "You can only review products you’ve bought." });
  }

  // Enforce one review per user per product
  const existing = await prisma.review.findFirst({
    where: { productId, userId: user.userId },
  });
  if (existing) {
    return res
      .status(409)
      .json({ error: "You have already reviewed this product." });
  }

  // Create + recompute aggregates inside a transaction
  const result = await prisma.$transaction(async (tx) => {
    const created = await tx.review.create({
      data: {
        productId,
        userId: user.userId,
        rating,
        comment: comment?.trim() || null,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    const agg = await tx.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        averageRating: agg._avg.rating ?? 0,
        reviewsCount: agg._count.rating ?? 0,
      },
    });

    return created;
  });

  return res.status(201).json(result);
});

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;

  // Map lowercase URL param → Enum value
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  // Validate category against the enum
  if (!Object.values(Category).includes(formattedCategory as Category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  try {
    const products = await prisma.product.findMany({
      where: { category: formattedCategory as Category },
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.userId;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (product.sellerId !== userId) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this product" });
  }

  const allowed = ["name", "description", "price", "image", "category"];
  const data = Object.fromEntries(
    allowed
      .filter((key) => typeof req.body[key] !== "undefined")
      .map((key) => [key, req.body[key]])
  );

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data,
  });

  return res.json(updated);
});

router.delete("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;

  if (!req.user?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.userId;

  // 1) Fetch by id only
  const product = await prisma.product.findUnique({ where: { id: productId } });

  // 2) Not found
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 3) Exists but not owner
  if (product.sellerId !== userId) {
    return res
      .status(403)
      .json({ error: "Not allowed to delete this product" });
  }
  // 4) Delete
  await prisma.product.delete({ where: { id: productId } });

  // 5) No content
  return res.status(204).send();
});

export default router;
