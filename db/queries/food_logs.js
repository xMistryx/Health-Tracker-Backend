import db from "#db/client";

export async function getFoodLogs(userId) {
    const sql = `
        SELECT * FROM food_logs
        WHERE user_id = $1
        ORDER BY date DESC
    `;
    const { rows: logs } = await db.query(sql, [userId]);
    return logs;
}

export async function addFoodLog(userId, { date, food_item, calories, protein, carbs, fiber, fat }) {
    const sql = `
        INSERT INTO food_logs (user_id, date, food_item, calories, protein, carbs, fiber, fat)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;
    const { rows: [log] } = await db.query(sql, [userId, date, food_item, calories, protein, carbs, fiber, fat]);
    return log;
}

export async function updateFoodLog(id, { date, food_item, calories, protein, carbs, fiber, fat }) {
    const sql = `
        UPDATE food_logs
        SET date = $2, food_item = $3, calories = $4, protein = $5, carbs = $6, fiber = $7, fat = $8
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [log] } = await db.query(sql, [id, date, food_item, calories, protein, carbs, fiber, fat]);
    return log;
}

export async function deleteFoodLog(id) {
    const sql = `
        DELETE FROM food_logs
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [log] } = await db.query(sql, [id]);
    return log;
}
