import express from "express";
import { prisma } from "../prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  res.json(product);
});

// Create a product
router.post("/", authenticate, async (req, res) => {
  const { name, description, price } = req.body;
  const user = req.user;

  if (!user || user.role !== "SELLER") {
    return res.status(403).json({ error: "Only sellers can create products." });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      sellerId: user.userId,
    },
  });

  res.status(201).json(product);
});

export default router;
