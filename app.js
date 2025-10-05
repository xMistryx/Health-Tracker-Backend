import express from "express";
import cors from "cors";
import getUserFromToken from "#middleware/getUserFromToken";
import usersRouter from "#api/users";
import health_infoRouter from "#api/health_info";
import water_logsRouter from "#api/water_logs";
import sleep_logsRouter from "#api/sleep_logs";
import exercise_logsRouter from "#api/exercise_logs";
import food_logsRouter from "#api/food_logs";
import affirmationsRouter from "#api/affirmations";
import health_tipsRouter from "#api/health_tips";
import recipesRouter from "#api/recipes";

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://xtendx.netlify.app'
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // Only apply getUserFromToken to protected routes, not /users/register or /users/login
  if (req.path === '/users/register' || req.path === '/users/login') {
    return next();
  }
  getUserFromToken(req, res, next);
});

app.use("/users", usersRouter);
app.use("/health_info", health_infoRouter);
app.use("/water_logs", water_logsRouter);
app.use("/sleep_logs", sleep_logsRouter);
app.use("/exercise_logs", exercise_logsRouter);
app.use("/food_logs", food_logsRouter);
app.use("/health_tips", health_tipsRouter);
app.use("/affirmations", affirmationsRouter);
app.use("/recipes", recipesRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    case "23505":
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

export default app;
