// api/sleep.js
import express from "express";
const router = express.Router();
import db from "../db/client.js";

import {
  getSleepEntries,
  addSleepEntry,
  updateSleepEntry,
  deleteSleepEntry,
} from "../db/queries/sleep.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

// ✅ Middleware order is crucial
router.use(getUserFromToken); // sets req.user if token is valid
router.use(requireUser); // blocks if no valid user

// Get all sleep logs for all users (admin view)
router.get("/all", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM sleep_logs ORDER BY user_id, date DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sleep logs for the logged-in user
router.get("/", async (req, res) => {
  try {
    const sleeps = await getSleepEntries(req.user.id);
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new sleep log
router.post("/", async (req, res) => {
  const { date, sleep_type, start_time, end_time, duration } = req.body;
  if (!date || !sleep_type || duration == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sleep = await addSleepEntry(req.user.id, {
      date,
      sleep_type,
      start_time,
      end_time,
      duration,
    });
    res.status(201).json(sleep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to handle :id param
router.param("id", async (req, res, next, id) => {
  try {
    const sleeps = await getSleepEntries(req.user.id);
    const sleep = sleeps.find((s) => s.id === parseInt(id));
    if (!sleep) return res.status(404).json({ error: "Sleep log not found" });
    req.sleepLog = sleep;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single sleep log
router.get("/:id", (req, res) => {
  res.json(req.sleepLog);
});

// Update a sleep log
router.put("/:id", async (req, res) => {
  const { date, sleep_type, start_time, end_time, duration } = req.body;
  try {
    const updated = await updateSleepEntry(req.sleepLog.id, {
      sleep_type,
      start_time,
      end_time,
      duration,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a sleep log
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteSleepEntry(req.sleepLog.id);
    res.json({ message: "Sleep log deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
