import db from "../client.js";

// Get all recipes (optionally filter by user)
export async function getRecipes() {
    const sql = `SELECT * FROM recipes ORDER BY id`;
    const { rows } = await db.query(sql);
    return rows;
  }


// Get a single recipe by id
export async function getRecipeById(id) {
  const sql = `SELECT * FROM recipes WHERE id = $1`;
  const { rows: [recipe] } = await db.query(sql, [id]);
  return recipe;
}

// Add a new user recipe
export async function addRecipe(userId, { title, image_url, description, ingredients, instructions, created_by }) {
  const sql = `
    INSERT INTO recipes (user_id, title, image_url, description, ingredients, instructions, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const { rows: [recipe] } = await db.query(sql, [userId, title, image_url, description, JSON.stringify(ingredients), instructions, created_by]);
  return recipe;
}

// Update a user recipe
export async function updateRecipe(id, userId, { title, image_url, description, ingredients, instructions, created_by }) {
  const sql = `
    UPDATE recipes
    SET title = $3, image_url = $4, description = $5, ingredients = $6, instructions = $7, created_by = $8, updated_at = NOW()
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  const { rows: [recipe] } = await db.query(sql, [id, userId, title, image_url, description, JSON.stringify(ingredients), instructions, created_by]);
  return recipe;
}

// Delete a user recipe
export async function deleteRecipe(id, userId) {
  const sql = `DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING *`;
  const { rows: [recipe] } = await db.query(sql, [id, userId]);
  return recipe;
}
