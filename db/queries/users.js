import db from "../client.js";
import bcrypt from "bcryptjs";

// Create a new user
export async function createUser(
  first_name,
  last_name,
  username,
  email,
  password
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const result = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, password) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [first_name, last_name, username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
}

// Get user by email (no password check)
export async function getUserByEmail(email) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Error fetching user: " + err.message);
  }
}

// ✅ Get user by email & password (with bcrypt compare)
export async function getUserByEmailAndPassword(email, password) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  } catch (err) {
    throw new Error("Error verifying user: " + err.message);
  }
}

// Get user by id
export async function getUserById(id) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Error fetching user by ID: " + err.message);
  }
}
