const express = require("express");
const Deal = require("../models/Deal.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Public: list deals with optional filters and search
router.get("/", async (req, res) => {
  try {
    const { category, access, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (access === "locked") {
      query.isLocked = true;
    } else if (access === "unlocked") {
      query.isLocked = false;
    }

    if (search) {
      const pattern = new RegExp(search, "i");
      query.$or = [{ title: pattern }, { partnerName: pattern }];
    }

    const deals = await Deal.find(query).sort({ createdAt: -1 });
    return res.json({ deals });
  } catch (err) {
    console.error("Fetch deals error", err);
    return res.status(500).json({ error: { message: "Failed to fetch deals" } });
  }
});

// Public: single deal
router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: { message: "Deal not found" } });
    }
    return res.json({ deal });
  } catch (err) {
    console.error("Fetch deal error", err);
    return res.status(500).json({ error: { message: "Failed to fetch deal" } });
  }
});

// Protected admin-style route to seed or create deals could go here in the future
// router.post("/", auth(true), async (req, res) => { ... })

module.exports = router;


