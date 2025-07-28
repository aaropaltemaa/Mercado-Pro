import express from 'express';
import { prisma } from './prisma';
import cors from 'cors';
import authRoutes from "./routes/auth"

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Create a product
app.post('/products', async (req, res) => {
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


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
