import db from "#db/client";

export async function getAffirmations() {
    const sql = `
        SELECT *
        FROM affirmations
    `;
    const { rows: affirmations } = await db.query(sql);
    return affirmations;
}

export async function getAffirmationById(id) {
    const sql = `
        SELECT *
        FROM affirmations
        WHERE id = $1
    `;
    const { rows: [affirmation] } = await db.query(sql, [id]);
    return affirmation;
}

export async function addAffirmation(message) {
    const sql = `
        INSERT INTO affirmations (message)
        VALUES ($1)
        RETURNING *
    `;
    const { rows: [affirmation] } = await db.query(sql, [message]);
    return affirmation;
}

export async function updateAffirmation(id, message) {
    const sql = `
        UPDATE affirmations 
        SET message = $2
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [affirmation] } = await db.query(sql, [id, message]);
    return affirmation;
}

export async function deleteAffirmation(id) {
    const sql = `
        DELETE FROM affirmations
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [affirmation] } = await db.query(sql, [id]);
    return affirmation;
}