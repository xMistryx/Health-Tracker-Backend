import express from "express";
const router = express.Router();
export default router;

import { 
    getSleepEntries,
    addSleepEntry, 
    updateSleepEntry, 
    deleteSleepEntry 
} from "#db/queries/sleep";
import { requireUser } from "#middleware/requireUser";
import { requireBody } from "#middleware/requireBody";

router.use(requireUser);

router
.route("/")
.post(requireBody(["date", "sleep_type", "duration"]), async (req, res) => {
    const { date, sleep_type, duration } = req.body;
    try {
        const newSleepEntry = await addSleepEntry(req.user.id, { date, sleep_type, duration });
        res.status(201).json(newSleepEntry);
    } catch (error) {
        console.error("Error adding sleep entry:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
.get(async (req, res) => {
    try {
        const sleepEntries = await getSleepEntries(req.user.id);
        res.json(sleepEntries);
    } catch (error) {
        console.error("Error fetching sleep entries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
// GET /sleep/recommendation
router.get("/recommendation", async (req, res) => {
    try {
        // Assuming getSleepEntries returns entries sorted by date DESC
        const sleepEntries = await getSleepEntries(req.user.id);
        if (!sleepEntries || sleepEntries.length === 0) {
            return res.status(404).json({ message: "No sleep logs found." });
        }
        const lastSleep = sleepEntries[0];
        const duration = lastSleep.duration;
        let recommendation = "";
        if (duration < 4) {
            recommendation = "Critical: Less than 4 hours of sleep is very harmful to your health. Please prioritize rest.";
        } else if (duration >= 4 && duration < 7) {
            recommendation = "Bad: 4-6 hours of sleep is not enough. Try to get more rest for better health.";
        } else if (duration >= 7 && duration <= 9) {
            recommendation = "Perfect: 7-9 hours of sleep is ideal. Keep up the good sleep habits!";
        } else if (duration > 9) {
            recommendation = "Health Risk: More than 10 hours of sleep may indicate underlying health issues. Consult a professional if this continues.";
        }
        res.json({
            lastSleep,
            recommendation
        });
    } catch (error) {
        console.error("Error fetching sleep recommendation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});