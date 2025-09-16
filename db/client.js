import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;