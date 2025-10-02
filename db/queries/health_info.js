// db/queries/health_info.js
import db from "../client.js";

// Create a new health info record
export async function createHealthInfo(
  userId,
  username,
  height,
  weight,
  age,
  biologicalSex,
  gender
) {
  const sql = `
    INSERT INTO health_info (user_id, username, height, weight, age, biological_sex, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const {
    rows: [healthInfo],
  } = await db.query(sql, [userId, username, height, weight, age, biologicalSex, gender]);
  return healthInfo;
}

// Get all health info records for a user
export async function getHealthInfoByUserId(userId) {
  const sql = `
    SELECT *
    FROM health_info
    WHERE user_id = $1;
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

// Get a single health info record by its ID
export async function getHealthInfoById(id) {
  const sql = `
    SELECT *
    FROM health_info
    WHERE id = $1;
  `;
  const {
    rows: [healthInfo],
  } = await db.query(sql, [id]);
  return healthInfo;
}

// Update a health info record
export async function updateHealthInfo(
  id,
  height,
  weight,
  age,
  biologicalSex,
  gender
) {
  const sql = `
    UPDATE health_info
    SET height = $2,
        weight = $3,
        age = $4,
        biological_sex = $5,
        gender = $6
    WHERE id = $1
    RETURNING *;
  `;
  const {
    rows: [healthInfo],
  } = await db.query(sql, [id, height, weight, age, biologicalSex, gender]);
  return healthInfo;
}

// Delete a health info record
export async function deleteHealthInfo(id) {
  const sql = `
    DELETE FROM health_info
    WHERE id = $1
    RETURNING *;
  `;
  const {
    rows: [deletedHealthInfo],
  } = await db.query(sql, [id]);
  return deletedHealthInfo;
}
