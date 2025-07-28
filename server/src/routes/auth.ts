import express from 'express';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered.' });
  }

  // 3. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'SELLER' // or 'BUYER', depending on your logic
    },
  });

  // 5. Respond
  res.status(201).json({ message: 'User registered successfully.', user: { id: user.id, email: user.email, role: user.role } });
});


export default router;
