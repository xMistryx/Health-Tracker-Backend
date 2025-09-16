import express from "express";
const router = express.Router();

import {
  createExerciseLog,
  getExerciseLogsByUserId,
  getExerciseLogById,
  updateExerciseLog,
  deleteExerciseLog,
} from "../db/queries/exercise_logs.js";

import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

// ✅ Middleware order is crucial
router.use(getUserFromToken); // sets req.user if token is valid
router.use(requireUser); // blocks if no valid user

// Get all exercise logs for the logged-in user
router.get("/", async (req, res) => {
  const logs = await getExerciseLogsByUserId(req.user.id);
  res.json(logs);
});

// Create a new exercise log
router.post("/", async (req, res) => {
  const { date, exercise_type, duration } = req.body; // use snake_case to match DB
  if (!date || !exercise_type || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const log = await createExerciseLog(
      req.user.id,
      date,
      exercise_type,
      duration
    );
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to handle :id param
router.param("id", async (req, res, next, id) => {
  const log = await getExerciseLogById(id);
  if (!log) return res.status(404).json({ error: "Exercise log not found" });
  req.exerciseLog = log;
  next();
});

// Get a single exercise log
router.get("/:id", (req, res) => {
  if (req.user.id !== req.exerciseLog.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot view this log" });
  }
  res.json(req.exerciseLog);
});

// Update a log by ID
router.put("/:id", async (req, res) => {
  if (req.user.id !== req.exerciseLog.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot update this log" });
  }
  const { date, exercise_type, duration } = req.body; // match DB
  try {
    const updatedLog = await updateExerciseLog(
      req.exerciseLog.id,
      date,
      exercise_type,
      duration
    );
    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a log by ID
router.delete("/:id", async (req, res) => {
  if (req.user.id !== req.exerciseLog.user_id) {
    return res
      .status(403)
      .json({ error: "Forbidden: You cannot delete this log" });
  }
  try {
    const deletedLog = await deleteExerciseLog(req.exerciseLog.id);
    res.json(deletedLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
