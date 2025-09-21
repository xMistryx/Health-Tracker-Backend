import express from "express";
const router = express.Router();
import db from "../db/client.js";

import {
  createHealthInfo,
  getHealthInfoByUserId,
  getHealthInfoById,
  updateHealthInfo,
  deleteHealthInfo,
} from "../db/queries/health_info.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

// ✅ Middleware order: extract user from token first
router.use(getUserFromToken);
router.use(requireUser);

// TEMP: Get all users' health info (for testing only)
router.get("/all", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM health_info ORDER BY user_id"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all health info records for logged-in user
router.get("/", async (req, res) => {
  try {
    const healthInfo = await getHealthInfoByUserId(req.user.id);
    res.json(healthInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new health info record
router.post("/", async (req, res) => {
  try {
    const { height, weight, age, biologicalSex, gender } = req.body;
    if (!height || !weight || !age || !biologicalSex || !gender) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("POST /health_info body:", req.body); // <-- Add this

    const healthInfo = await createHealthInfo(
      req.user.id,
      height,
      weight,
      age,
      biologicalSex,
      gender
    );
    res.status(201).json(healthInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to handle :id param
router.param("id", async (req, res, next, id) => {
  try {
    const healthInfo = await getHealthInfoById(id);
    if (!healthInfo)
      return res.status(404).json({ error: "Health info not found" });
    req.healthInfo = healthInfo;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single health info record by ID
router.get("/:id", (req, res) => {
  if (req.user.id !== req.healthInfo.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot view this record" });
  }
  res.json(req.healthInfo);
});

// Update a health info record
router.put("/:id", async (req, res) => {
  if (req.user.id !== req.healthInfo.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update this record" });
  }
  try {
    const { height, weight, age, biologicalSex, gender } = req.body;
    const updated = await updateHealthInfo(
      req.healthInfo.id,
      height,
      weight,
      age,
      biologicalSex,
      gender
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a health info record
router.delete("/:id", async (req, res) => {
  if (req.user.id !== req.healthInfo.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot delete this record" });
  }
  try {
    const deleted = await deleteHealthInfo(req.healthInfo.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
