import express from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    // 1. Validate input
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required." });
    }
    if (!["BUYER", "SELLER"].includes(role)) {
        return res.status(400).json({ error: "Invalid user role." });
    }
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ error: "Email is already registered." });
    }
    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 4. Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });
    // 5. Respond
    res.status(201).json({
        message: "User registered successfully.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // 1. Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    // 2. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
    }
    // 3. Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials." });
    }
    // 4. Sign JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // 5. Return token and user info
    res.json({
        message: "Login successful.",
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
});
export default router;
