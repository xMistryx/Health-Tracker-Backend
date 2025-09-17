import db from "../client.js";

// Create tip
export async function createHealthTip(category, tip) {
  const sql = `
    INSERT INTO health_tips (category, tip)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const {
    rows: [newTip],
  } = await db.query(sql, [category, tip]);
  return newTip;
}

// Get all tips
export async function getAllHealthTips() {
  const sql = `SELECT * FROM health_tips`;
  const { rows } = await db.query(sql);
  return rows;
}

// Get tip by ID
export async function getHealthTipById(id) {
  const sql = `SELECT * FROM health_tips WHERE id = $1;`;
  const {
    rows: [tip],
  } = await db.query(sql, [id]);
  return tip;
}

// Update tip
export async function updateHealthTip(id, category, tip) {
  const sql = `
    UPDATE health_tips
    SET category = $2, tip = $3
    WHERE id = $1
    RETURNING *;
  `;
  const {
    rows: [updated],
  } = await db.query(sql, [id, category, tip]);
  return updated;
}

// Delete tip
export async function deleteHealthTip(id) {
  const sql = `DELETE FROM health_tips WHERE id = $1 RETURNING *;`;
  const {
    rows: [deleted],
  } = await db.query(sql, [id]);
  return deleted;
}
