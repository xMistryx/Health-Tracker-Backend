// db/queries/sleep.js
import db from "../client.js";

export async function getSleepEntries(userId) {
  const sql = `
    SELECT id, user_id, date, sleep_type, start_time, end_time, duration
    FROM sleep_logs
    WHERE user_id = $1
    ORDER BY date DESC
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function addSleepEntry(
  userId,
  { date, sleep_type, start_time, end_time, duration }
) {
  const sql = `
    INSERT INTO sleep_logs (user_id, date, sleep_type, start_time, end_time, duration)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const {
    rows: [sleep],
  } = await db.query(sql, [
    userId,
    date,
    sleep_type,
    start_time,
    end_time,
    duration,
  ]);
  return sleep;
}

export async function updateSleepEntry(
  id,
  { sleep_type, start_time, end_time, duration }
) {
  const sql = `
    UPDATE sleep_logs
    SET sleep_type = $2, start_time = $3, end_time = $4, duration = $5
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [sleep],
  } = await db.query(sql, [id, sleep_type, start_time, end_time, duration]);
  return sleep;
}

export async function deleteSleepEntry(id) {
  const sql = `
    DELETE FROM sleep_logs
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [sleep],
  } = await db.query(sql, [id]);
  return sleep;
}
