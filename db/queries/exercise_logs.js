import db from "../client.js";

// Create a new exercise log
export async function createExerciseLog(userId, date, exercise_type, duration) {
  const sql = `
    INSERT INTO exercise_logs
      (user_id, date, exercise_type, duration)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *
  `;
  const {
    rows: [exerciseLog],
  } = await db.query(sql, [userId, date, exercise_type, duration]);
  return exerciseLog;
}

// Get all exercise logs (admin or testing use)
export async function getAllExerciseLogs() {
  const sql = `
    SELECT *
    FROM exercise_logs
    ORDER BY date DESC
  `;
  const { rows: exerciseLogs } = await db.query(sql);
  return exerciseLogs;
}

// Get a single exercise log by ID
export async function getExerciseLogById(id) {
  const sql = `
    SELECT *
    FROM exercise_logs
    WHERE id = $1
  `;
  const {
    rows: [exerciseLog],
  } = await db.query(sql, [id]);
  return exerciseLog;
}

// Get all logs for a specific user
export async function getExerciseLogsByUserId(userId) {
  const sql = `
    SELECT *
    FROM exercise_logs
    WHERE user_id = $1
    ORDER BY date DESC
  `;
  const { rows: exerciseLogs } = await db.query(sql, [userId]);
  return exerciseLogs;
}

// Update an exercise log by ID
export async function updateExerciseLog(id, date, exercise_type, duration) {
  const sql = `
    UPDATE exercise_logs
    SET date = $1,
        exercise_type = $2,
        duration = $3
    WHERE id = $4
    RETURNING *
  `;
  const {
    rows: [exerciseLog],
  } = await db.query(sql, [date, exercise_type, duration, id]);
  return exerciseLog;
}

// Delete an exercise log by ID
export async function deleteExerciseLog(id) {
  const sql = `
    DELETE FROM exercise_logs
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [exerciseLog],
  } = await db.query(sql, [id]);
  return exerciseLog;
}
