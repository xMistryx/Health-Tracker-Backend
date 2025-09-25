import db from "#db/client";

export async function getSleepEntries(userId) {
    const sql = `
        SELECT id, user_id, date, sleep_type, start_time, end_time, duration
        FROM sleep_logs
        WHERE user_id = $1
        ORDER BY date DESC
    `;
    const { rows: sleeps } = await db.query(sql, [userId]);
    return sleeps;
}

export async function addSleepEntry(userId, { date, sleep_type, start_time, end_time, duration }) {
    const startTimestamp = `${date} ${start_time}:00`;
    const endTimestamp = `${date} ${end_time}:00`;
    const sql = `
        INSERT INTO sleep_logs (user_id, date, sleep_type, start_time, end_time, duration)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const { rows: [sleep] } = await db.query(sql, [userId, date, sleep_type, startTimestamp, endTimestamp, duration]);
    return sleep;
}

export async function updateSleepEntry(id, { date, sleep_type, start_time, end_time, duration }) {
    const startTimestamp = `${date} ${start_time}:00`;
    const endTimestamp = `${date} ${end_time}:00`;
    const sql = `
        UPDATE sleep_logs
        SET date = $2, sleep_type = $3, start_time = $4, end_time = $5, duration = $6
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [sleep] } = await db.query(sql, [id, date, sleep_type, startTimestamp, endTimestamp, duration]);
    return sleep;
}

export async function deleteSleepEntry(id) {
    const sql = `
        DELETE FROM sleep_logs
        WHERE id = $1
        RETURNING *
    `;
    const { rows: [sleep] } = await db.query(sql, [id]);
    return sleep;
}