import express from "express";
const router = express.Router();
export default router;

import { getWaterEntries, addWaterEntry } from "#db/queries/water.js";
import { requireUser } from "#middleware/requireUser";
import { requireBody } from "#middleware/requireBody";

router.use(requireUser);

router
.route("/")
// POST /water
.post(requireBody(["date", "amount_oz"]), async (req, res) => {
    const { date, amount_oz } = req.body;
    try {
        const newWaterEntry = await addWaterEntry(req.user.id, date, amount_oz);
        res.status(201).json(newWaterEntry);
    } catch (error) {
        console.error("Error adding water entry:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
// GET /water/history
.get(async (req, res) => {
    try {
        const waterEntries = await getWaterEntries(req.user.id);
        res.json(waterEntries);
    } catch (error) {
        console.error("Error fetching water entries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// GET /water/recommendation
router.get("/recommendation", async (req, res) => {
    try {
        const waterEntries = await getWaterEntries(req.user.id);
        if (!waterEntries || waterEntries.length === 0) {
            return res.status(404).json({ message: "No water logs found." });
        }
        const lastEntry = waterEntries[0];
        const totalOunces = parseFloat(lastEntry.total_oz);
        let recommendation = "";
        if (totalOunces < 32) {
            recommendation = "Low: You drank less than 32 oz of water today. Try to increase your intake for better hydration.";
        } else if (totalOunces >= 32 && totalOunces < 64) {
            recommendation = "Moderate: You drank between 32-64 oz of water today. Aim for at least 64 oz for optimal hydration.";
        } else if (totalOunces >= 64 && totalOunces <= 100) {
            recommendation = "Excellent: You drank between 64-100 oz of water today. Keep up the good hydration habits!";
        } else if (totalOunces >= 100 && totalOunces <= 150) {
            recommendation = "Good: You drank more than 100 oz of water today. Great job staying well-hydrated!";
        } else if (totalOunces >= 150 && totalOunces <= 200) {
            recommendation = "Warning: You drank more than 150 oz of water today. This is excessive and could be harmful.";
        } else if (totalOunces > 200) {
            recommendation = "Critical: drinking excessive amounts of water can overwhelm your kidneys and dilute the sodium content of your blood.";
        }
        res.json({
            lastEntry,
            recommendation
        });
    } catch (error) {
        console.error("Error generating water recommendation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
