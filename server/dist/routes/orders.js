"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../prisma");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const orders = await prisma_1.prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });
    res.json(orders);
});
router.post("/", auth_1.authenticate, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.userId;
    const { shippingData } = req.body;
    const cartItems = await prisma_1.prisma.cartItem.findMany({
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
    const total = orderItemsData.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const order = await prisma_1.prisma.order.create({
        data: {
            userId,
            total,
            fullName: shippingData.fullName,
            address: shippingData.address,
            city: shippingData.city,
            postalCode: shippingData.postalCode,
            country: shippingData.country,
            phone: shippingData.phone,
        },
    });
    const finalOrderItems = orderItemsData.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        orderId: order.id,
    }));
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.orderItem.createMany({ data: finalOrderItems }),
        prisma_1.prisma.cartItem.deleteMany({ where: { userId } }),
    ]);
    return res.status(201).json({ message: "Order placed succesfully" });
});
exports.default = router;
