import express from "express";
import { authenticate } from "../middleware/auth";
import { prisma } from "../prisma";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.userId;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  res.json(cartItems);
});

router.post("/", authenticate, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ error: "Invalid or missing productId" });
  }

  if (!quantity || typeof quantity !== "number" || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number" });
  }

  const userId = req.user.userId;

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: userId,
        productId: productId,
        quantity: quantity,
      },
    });
  }
});

export default router;
