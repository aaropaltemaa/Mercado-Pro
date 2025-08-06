import express from "express";
import { prisma } from "../prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

console.log("Product routes loaded");

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
  const { name, description, price, image } = req.body;
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

export default router;
