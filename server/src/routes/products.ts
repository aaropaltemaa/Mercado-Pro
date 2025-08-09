import express from "express";
import { prisma } from "../prisma";
import { authenticate } from "../middleware/auth";
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
  const { name, description, price, image, category } = req.body;
  const user = req.user;

  if (!user || user.role !== "SELLER") {
    return res.status(403).json({ error: "Only sellers can create products." });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      image,
      category,
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
  res.json(product);
});

router.put("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const product = await prisma.product.findFirst({
    where: { id: productId, sellerId: userId },
  });

  if (!product) return res.status(404).json({ error: "Product not found" });

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
    where: { id: productId, sellerId: userId },
    data,
  });

  return res.json(updated);
});

router.delete("/:id", authenticate, async (req, res) => {
  const productId = req.params.id;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.userId;

  const productToDelete = await prisma.product.findFirst({
    where: { id: productId, sellerId: userId },
  });

  if (!productToDelete) {
    return res.status(404).json({ error: "Product not found" });
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  return res.status(204).send();
});

export default router;
