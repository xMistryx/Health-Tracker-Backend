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

export async function updateFoodLog(id, { food_item, calories, protein, carbs, fiber, fat }) {
    const sql = `
        UPDATE food_logs
        SET food_item = $2, calories = $3, protein = $4, carbs = $5, fiber = $6, fat = $7
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [log] } = await db.query(sql, [id, food_item, calories, protein, carbs, fiber, fat]);
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
