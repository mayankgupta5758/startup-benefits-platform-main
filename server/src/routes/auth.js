const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: { message: "Name, email and password are required" } });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: { message: "Password must be at least 6 characters" } });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: { message: "Email is already registered" } });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || "founder",
    });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, isVerified: user.isVerified, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("Register error", err);
    return res.status(500).json({ error: { message: "Registration failed" } });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: { message: "Email and password are required" } });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: { message: "Invalid credentials" } });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: { message: "Invalid credentials" } });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, isVerified: user.isVerified, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: { message: "Login failed" } });
  }
});

router.get("/profile", require("../middleware/auth.js")(true), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Profile fetch error", err);
    return res.status(500).json({ error: { message: "Failed to fetch profile" } });
  }
});

router.post("/verify", require("../middleware/auth.js")(true), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, isVerified: user.isVerified, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Verification error", err);
    return res.status(500).json({ error: { message: "Verification failed" } });
  }
});

module.exports = router;


