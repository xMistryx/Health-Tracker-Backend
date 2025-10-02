import express from "express";
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from "../db/queries/recipes.js";
import  requireUser  from "#middleware/requireUser";
import  requireBody  from "#middleware/requireBody";

const router = express.Router();

// Get all recipes (public and user)
router.get("/", requireUser, async (req, res) => {
  try {
    const recipes = await getRecipes(req.user.id);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a new recipe (user only)
router.post("/", requireUser, requireBody(["title", "description", "ingredients", "instructions"]), async (req, res) => {
  try {
    const recipeData = { ...req.body, username: req.user.username };
    const recipe = await addRecipe(req.user.id, recipeData);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user recipe
router.put("/:id", requireUser, requireBody(["title", "description", "ingredients", "instructions"]), async (req, res) => {
  try {
    const recipe = await updateRecipe(req.params.id, req.user.id, req.body);
    if (!recipe) return res.status(404).json({ error: "Recipe not found or not yours" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user recipe
router.delete("/:id", requireUser, async (req, res) => {
  try {
    const recipe = await deleteRecipe(req.params.id, req.user.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found or not yours" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
