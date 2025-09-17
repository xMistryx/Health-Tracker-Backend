import express from "express";
import { getAffirmations, getAffirmationById, addAffirmation, updateAffirmation, deleteAffirmation } from "#db/queries/affirmations";
// import requireAdmin from "#middleware/requireAdmin";

const router = express.Router()

// router.use(requireAdmin); 

router
  .route("/")
  .get(async (req, res) => {
    const affirmations = await getAffirmations();
    res.send(affirmations);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    const { message } = req.body;
    if (!message)
      return res.status(400).send("Request body requires: message");
    const affirmation = await addAffirmation(message);
    res.status(201).send(affirmation);
  });

router
  .param("id", async (req, res, next, id) => {
    const affirmation = await getAffirmationById(id);
    if (!affirmation) return res.status(404).send("affirmation not found.");
    req.affirmation = affirmation;
    next();
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.affirmation);
  })
  .delete(async (req, res) => {
    const affirmation = await deleteAffirmation(req.affirmation.id);
    return res.status(204).send(affirmation);
  })
  .put(async (req, res) => {
    const { message } = req.body;
    if (!message)
      return res.status(400).send("Request body requires: message");
    const affirmation = await updateAffirmation(req.affirmation.id, message);
    return res.send(affirmation);
  });

export default router;export async function getEncouragement(category, milestone) {
    const sql = `
        SELECT (message)
        FROM encouragements
        WHERE category = $1 AND milestone = $2
    `;
    const { rows: encouragement } = await db.query(sql, [category, milestone]);
    return encouragement;
}