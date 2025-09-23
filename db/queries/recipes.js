import db from "../client.js";

// Get all recipes (optionally filter by user)
export async function getRecipes(userId = null) {
  if (userId) {
    const sql = `SELECT * FROM recipes WHERE user_id IS NULL OR user_id = $1 ORDER BY id`;
    const { rows } = await db.query(sql, [userId]);
    return rows;
  } else {
    const sql = `SELECT * FROM recipes WHERE user_id IS NULL ORDER BY id`;
    const { rows } = await db.query(sql);
    return rows;
  }
}

// Get a single recipe by id
export async function getRecipeById(id) {
  const sql = `SELECT * FROM recipes WHERE id = $1`;
  const { rows: [recipe] } = await db.query(sql, [id]);
  return recipe;
}

// Add a new user recipe
export async function addRecipe(userId, { name, description, ingredients, instructions }) {
  const sql = `
    INSERT INTO recipes (user_id, name, description, ingredients, instructions)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { rows: [recipe] } = await db.query(sql, [userId, name, description, ingredients, instructions]);
  return recipe;
}

// Update a user recipe
export async function updateRecipe(id, userId, { name, description, ingredients, instructions }) {
  const sql = `
    UPDATE recipes
    SET name = $3, description = $4, ingredients = $5, instructions = $6
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  const { rows: [recipe] } = await db.query(sql, [id, userId, name, description, ingredients, instructions]);
  return recipe;
}

// Delete a user recipe
export async function deleteRecipe(id, userId) {
  const sql = `DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *`;
  const { rows: [recipe] } = await db.query(sql, [id, userId]);
  return recipe;
}
