import express from "express";
const router = express.Router();

import {
  createHealthTip,
  getAllHealthTips,
  getHealthTipById,
  updateHealthTip,
  deleteHealthTip,
} from "../db/queries/health_tips.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import requireAdmin from "../middleware/requireAdmin.js";
import requireBody from "../middleware/requireBody.js";

// 1️⃣ Extract user from token for all routes
router.use(getUserFromToken);

// ------------------- PUBLIC ROUTES -------------------
// Get all tips
router.get("/", async (req, res) => {
  try {
    const tips = await getAllHealthTips();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one tip by ID
router.get("/:id", async (req, res) => {
  try {
    const tip = await getHealthTipById(req.params.id);
    if (!tip) return res.status(404).json({ error: "Tip not found" });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- ADMIN ROUTES -------------------
// Create a new tip
router.post(
  "/",
  requireUser,
  requireAdmin,
  requireBody(["category", "tip"]),
  async (req, res) => {
    try {
      const { category, tip } = req.body;
      const newTip = await createHealthTip(category, tip);
      res.status(201).json(newTip);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update a tip
router.put(
  "/:id",
  requireUser,
  requireAdmin,
  requireBody(["category", "tip"]),
  async (req, res) => {
    try {
      const { category, tip } = req.body;
      const updated = await updateHealthTip(req.params.id, category, tip);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a tip
router.delete("/:id", requireUser, requireAdmin, async (req, res) => {
  try {
    const deleted = await deleteHealthTip(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
