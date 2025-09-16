import db from "#db/client";

export async function getWaterEntries(userId) {
    const sql = `
    SELECT date, SUM(amount_oz) AS total_oz FROM water_logs WHERE 
    user_id = $1 GROUP BY date ORDER BY date DESC`;
    const { rows : waters } = await db.query(sql, [userId]);
    return waters;
}

export async function addWaterEntry(userId, date, amount_oz) {
    const sql = `
    INSERT INTO water_logs (user_id, date, amount_oz)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const { rows: [water] } = await db.query(sql, [userId, date, amount_oz]);
    return water;
}

export async function deleteWaterEntry(id) {
    const sql = `
    DELETE FROM water_logs
    WHERE id = $1
    RETURNING *`;
    const { rows: [water] } = await db.query(sql, [id]);
    return water;
}