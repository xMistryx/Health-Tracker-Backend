import express from "express";
import db from "../db/client.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import requireBody from "../middleware/requireBody.js";

const router = express.Router();

// ----- Helper functions -----
async function getUserByEmail(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  console.log(result.rows[0]);
  return result.rows[0];
}

async function getUserByEmailAndPassword(email, password) {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password); // <-- FIXED
  if (!isValid) return null;

  return user;
}

async function createUser(first_name, last_name, username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (first_name, last_name, username, email, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [first_name, last_name, username, email, hashedPassword]
  );
  return result.rows[0];
}

// ----- Routes -----

// Register new user
router.post(
  "/register",
  requireBody(["first_name", "last_name", "username", "email", "password"]),
  async (req, res) => {
    try {
      const { first_name, last_name, username, email, password } = req.body;

      const existingUser = await getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ error: "Email already exists" });

      const user = await createUser(
        first_name,
        last_name,
        username,
        email,
        password
      );

      const token = createToken({ id: user.id });
      res.status(201).json({ message: "User created successfully", token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Login
// Login
router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailAndPassword(email, password);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    // Create JWT token
    const token = createToken({ id: user.id });

    // Return token AND user info (without password)
    const { id, first_name, last_name, username, email: userEmail } = user;

    res.json({
      message: "Login successful",
      token,
      user: { id, first_name, last_name, username, email: userEmail },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TEMP: Get all users (for testing only)
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, first_name, last_name, username, email FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT id, first_name, last_name, username, email FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
