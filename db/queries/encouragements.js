import db from "#db/client";

export async function getEncouragements() {
    const sql = `
        SELECT *
        FROM encouragements
    `;
    const { rows: encouragements } = await db.query(sql);
    return encouragements;
}

export async function getEncouragement(category, milestone) {
    const sql = `
        SELECT message
        FROM encouragements
        WHERE category = $1 AND milestone = $2
    `;
    const { rows: encouragement } = await db.query(sql, [category, milestone]);
    return encouragement;
}

export async function getEncouragementById(id) {
    const sql = `
        SELECT *
        FROM encouragements
        WHERE id = $1
    `;
    const { rows: [encouragement] } = await db.query(sql, [id]);
    return encouragement;
}

export async function addEncouragement(category, milestone, message) {
    const sql = `
        INSERT INTO encouragements (category, milestone, message)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const { rows: [encouragement] } = await db.query(sql, [category, milestone, message]);
    return encouragement;
}

export async function updateEncouragement(id, category, milestone, message) {
    const sql = `
        UPDATE encouragements 
        SET category = $2, milestone = $3, message = $4
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [encouragement] } = await db.query(sql, [id, category, milestone, message]);
    return encouragement;
}

export async function deleteEncouragement(id) {
    const sql = `
        DELETE FROM encouragements
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [encouragement] } = await db.query(sql, [id]);
    return encouragement;
}