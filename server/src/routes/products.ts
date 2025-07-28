import express from 'express';
import { prisma } from '../prisma';
import { authenticate } from '../middleware/auth';
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Create a product
router.post('/', async (req, res) => {
  const { name, description, price, sellerId } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        sellerId,
      },
    });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
