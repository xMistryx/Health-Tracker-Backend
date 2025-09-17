import express from "express";
import userRoutes from "./api/users.js";
import exerciseLogsRouter from "./api/exercise_logs.js";
import healthInfoRouter from "./api/health_info.js";
import sleepRouter from "./api/sleep.js";
import healthTipsRouter from "./api/health_tips.js";
import waterIntakeRouter from "./api/water.js";

const app = express();

app.use(express.json());

// Mount API routes
app.use("/api/users", userRoutes);
app.use("/api/exercise_logs", exerciseLogsRouter);
app.use("/api/health_info", healthInfoRouter);
app.use("/api/sleep", sleepRouter);
app.use("/api/health_tips", healthTipsRouter);
app.use("/api/water", waterIntakeRouter);

export default app;
