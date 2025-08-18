"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../prisma");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const users = await prisma_1.prisma.user.findMany();
    res.json(users);
});
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma_1.prisma.user.create({
        data: { name, email, password },
    });
    res.json(user);
});
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await prisma_1.prisma.user.delete({ where: { id: userId } });
    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
});
exports.default = router;
