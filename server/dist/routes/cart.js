"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../prisma");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const cartItems = await prisma_1.prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
    });
    res.json(cartItems);
});
router.post("/", auth_1.authenticate, async (req, res) => {
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
    try {
        const existingItem = await prisma_1.prisma.cartItem.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
        });
        let cartItem;
        if (existingItem) {
            cartItem = await prisma_1.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: {
                        increment: quantity,
                    },
                },
                include: { product: true }, // Include product details in response
            });
        }
        else {
            cartItem = await prisma_1.prisma.cartItem.create({
                data: {
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                },
                include: { product: true }, // Include product details in response
            });
        }
        // Send the created/updated cart item back as response
        res.status(200).json({
            message: "Item added to cart successfully",
            cartItem: cartItem,
        });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/:itemId", auth_1.authenticate, async (req, res) => {
    const itemId = req.params.itemId;
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const existingCartItem = await prisma_1.prisma.cartItem.findFirst({
        where: { id: itemId, userId: userId },
    });
    if (existingCartItem) {
        await prisma_1.prisma.cartItem.delete({
            where: { id: existingCartItem.id },
        });
        res.status(204).json({
            message: "Cart item deleted succesfully",
        });
    }
    else {
        res.status(404).json({ error: "Cart item not found" });
    }
});
router.put("/:itemId", auth_1.authenticate, async (req, res) => {
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const existingCartItem = await prisma_1.prisma.cartItem.findFirst({
        where: { id: itemId, userId: userId },
    });
    if (!existingCartItem) {
        return res.status(404).json({ error: "Cart item not found" });
    }
    if (quantity < 1) {
        return res.status(400).json({ error: "Quantity must be at least 1" });
    }
    const updatedItem = await prisma_1.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
    });
    return res.json(updatedItem);
});
exports.default = router;
