import db from "#db/client";

export async function getHealthTips() {
    const sql = `
        SELECT *
        FROM health_tips
    `;
    const { rows: healthTips } = await db.query(sql);
    return healthTips;
}

export async function getHealthTip(category) {
    const sql = `
        SELECT tip
        FROM health_tips
        WHERE category = $1 
    `;
    const { rows: healthTip } = await db.query(sql, [category]);
    return healthTip;
}

export async function getHealthTipById(id) {
    const sql = `
        SELECT *
        FROM health_tips
        WHERE id = $1
    `;
    const { rows: [healthTip] } = await db.query(sql, [id]);
    return healthTip;
}

export async function addHealthTip(category, tip) {
    const sql = `
        INSERT INTO health_tips (category, tip)
        VALUES ($1, $2)
        RETURNING *
    `;
    const { rows: [healthTip] } = await db.query(sql, [category, tip]);
    return healthTip;
}

export async function updateHealthTip(id, category, tip) {
    const sql = `
        UPDATE health_tips 
        SET category = $2, tip = $3
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [healthTip] } = await db.query(sql, [id, category, tip]);
    return healthTip;
}

export async function deleteHealthTip(id) {
    const sql = `
        DELETE FROM health_tips
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [healthTip] } = await db.query(sql, [id]);
    return healthTip;
}