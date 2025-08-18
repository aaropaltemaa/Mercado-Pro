import express from "express";
import { prisma } from "../prisma";
const router = express.Router();
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
        data: { name, email, password },
    });
    res.json(user);
});
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
});
export default router;
