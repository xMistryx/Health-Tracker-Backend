import express from "express";
const router = express.Router();
export default router;

import {
    getFoodLogs,
    addFoodLog,
    updateFoodLog,
    deleteFoodLog
} from "#db/queries/food";
import { requireUser } from "#middleware/requireUser";
import { requireBody } from "#middleware/requireBody";

router.use(requireUser);

// GET /food
router.get("/", async (req, res) => {
    try {
        const logs = await getFoodLogs(req.user.id);
        res.json(logs);
    } catch (error) {
        console.error("Error fetching food logs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /food
router.post("/", requireBody(["date", "food_item"]), async (req, res) => {
    const { date, food_item, calories, protein, carbs, fiber, fat } = req.body;
    try {
        const newLog = await addFoodLog(req.user.id, { date, food_item, calories, protein, carbs, fiber, fat });
        res.status(201).json(newLog);
    } catch (error) {
        console.error("Error adding food log:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /food/:id
router.put("/:id", requireBody(["food_item"]), async (req, res) => {
    const { food_item, calories, protein, carbs, fiber, fat } = req.body;
    try {
        const updatedLog = await updateFoodLog(req.params.id, { food_item, calories, protein, carbs, fiber, fat });
        res.json(updatedLog);
    } catch (error) {
        console.error("Error updating food log:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /food/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedLog = await deleteFoodLog(req.params.id);
        res.json(deletedLog);
    } catch (error) {
        console.error("Error deleting food log:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
