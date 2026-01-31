const express = require("express");
const Claim = require("../models/Claim.js");
const Deal = require("../models/Deal.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Claim a deal (protected)
router.post("/:dealId", auth(true), async (req, res) => {
  try {
    const userId = req.user.id;
    const { dealId } = req.params;

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ error: { message: "Deal not found" } });
    }

    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({
        error: { message: "This deal is locked. Verification required before claiming." },
      });
    }

    const existing = await Claim.findOne({ user: userId, deal: dealId });
    if (existing) {
      return res.status(409).json({ error: { message: "You have already claimed this deal" } });
    }

    const claim = await Claim.create({
      user: userId,
      deal: dealId,
      status: "pending",
    });

    return res.status(201).json({ claim });
  } catch (err) {
    console.error("Claim deal error", err);
    return res.status(500).json({ error: { message: "Failed to claim deal" } });
  }
});

// Get claims for current user (protected)
router.get("/me", auth(true), async (req, res) => {
  try {
    const userId = req.user.id;
    const claims = await Claim.find({ user: userId })
      .populate("deal")
      .sort({ createdAt: -1 });

    return res.json({ claims });
  } catch (err) {
    console.error("Fetch claims error", err);
    return res.status(500).json({ error: { message: "Failed to fetch claimed deals" } });
  }
});

module.exports = router;


