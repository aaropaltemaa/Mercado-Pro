import express from 'express';
import { prisma } from '../prisma';
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
});

export default router;
