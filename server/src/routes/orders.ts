import express from "express";
import { prisma } from "../prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.userId;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  res.json(orders);
});

router.post("/", authenticate, async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.userId;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const orderItemsData = cartItems.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    };
  });

  const total = orderItemsData.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
    },
  });

  const finalOrderItems = orderItemsData.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    orderId: order.id,
  }));

  await prisma.$transaction([
    prisma.orderItem.createMany({ data: finalOrderItems }),
    prisma.cartItem.deleteMany({ where: { userId } }),
  ]);

  return res.status(201).json({ message: "Order placed succesfully" });
});

export default router;
