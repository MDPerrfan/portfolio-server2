import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }


    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );

    res.json({ success: true, token });
});

export default router;