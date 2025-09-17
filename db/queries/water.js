// db/queries/water.js
import db from "../client.js";

// Get all water entries for a user, grouped by date
export async function getWaterEntries(userId) {
  const sql = `
    SELECT date, SUM(amount_oz) AS total_oz
    FROM water_logs
    WHERE user_id = $1
    GROUP BY date
    ORDER BY date DESC
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

// Add a new water entry
export async function addWaterEntry(userId, date, amount_oz) {
  const sql = `
    INSERT INTO water_logs (user_id, date, amount_oz)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [entry],
  } = await db.query(sql, [userId, date, amount_oz]);
  return entry;
}

// Update an existing water entry by ID
export async function updateWaterEntry(id, { amount_oz }) {
  const sql = `
    UPDATE water_logs
    SET amount_oz = $2
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [entry],
  } = await db.query(sql, [id, amount_oz]);
  return entry;
}

// Delete a water entry by ID
export async function deleteWaterEntry(id) {
  const sql = `
    DELETE FROM water_logs
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [entry],
  } = await db.query(sql, [id]);
  return entry;
}

// Optional: Get a single water entry by ID (useful for ownership checks)
export async function getWaterEntryById(id) {
  const sql = `
    SELECT * FROM water_logs WHERE id = $1
  `;
  const {
    rows: [entry],
  } = await db.query(sql, [id]);
  return entry;
}
