import db from "../client.js";

// Get user by ID
export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

// Get user by email
export async function getUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  return user;
}

// Create user
export async function createUser(
  first_name,
  last_name,
  username,
  email,
  password,
  is_admin = false
) {
  const sql = `
    INSERT INTO users (first_name, last_name, username, email, password, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const {
    rows: [user],
  } = await db.query(sql, [
    first_name,
    last_name,
    username,
    email,
    password,
    is_admin,
  ]);
  return user;
}

// Optional: Get all users
export async function getAllUsers() {
  const sql = `SELECT * FROM users ORDER BY id`;
  const { rows } = await db.query(sql);
  return rows;
}
