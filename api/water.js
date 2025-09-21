// api/water.js
import express from "express";
import {
  getWaterEntries,
  addWaterEntry,
  updateWaterEntry,
  deleteWaterEntry,
} from "../db/queries/water.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

// ✅ Middleware order is important
router.use(getUserFromToken); // sets req.user if token is valid
router.use(requireUser); // blocks if no valid user

// GET all water entries for logged-in user
router.get("/", async (req, res) => {
  try {
    const entries = await getWaterEntries(req.user.id);
    console.log(entries);
    res.json(entries);
  } catch (err) {
    console.error("Error fetching water entries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST → Add a new water entry
router.post("/", requireBody(["date", "amount_oz"]), async (req, res) => {
  const { date, amount_oz } = req.body;

  try {
    const newEntry = await addWaterEntry(req.user.id, date, amount_oz);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error adding water entry:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT → Update a water entry by ID
router.put("/:id", requireBody(["amount_oz"]), async (req, res) => {
  const { id } = req.params;
  const { amount_oz } = req.body;

  try {
    const updated = await updateWaterEntry(id, { amount_oz });
    if (!updated) return res.status(404).json({ error: "Entry not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating water entry:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE → Remove a water entry by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteWaterEntry(id);
    if (!deleted) return res.status(404).json({ error: "Entry not found" });
    res.json({ message: "Water entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting water entry:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Optional: test token route
router.get("/test-token", requireUser, (req, res) => {
  res.json({ message: "Token works!", userId: req.user.id });
});

export default router;
