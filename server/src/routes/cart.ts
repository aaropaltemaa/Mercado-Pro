import express from 'express';
import { authenticate } from '../middleware/auth';
import { prisma } from '../prisma';

const router = express.Router()

router.get("/", authenticate, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const userId = req.user.userId;

    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true }
    });

    res.json(cartItems);

});

export default router