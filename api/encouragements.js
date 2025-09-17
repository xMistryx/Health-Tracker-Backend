import express from "express";
import { getEncouragements, getEncouragementById, addEncouragement, updateEncouragement, deleteEncouragement, getEncouragement } from "#db/queries/encouragements";
// import requireAdmin from "#middleware/requireAdmin";

const router = express.Router()

// router.use(requireAdmin); 

router
  .route("/")
  .get(async (req, res) => {
    const encouragements = await getEncouragements();
    res.send(encouragements);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    const { category, milestone, message } = req.body;
    if (!category || !milestone || !message)
      return res.status(400).send("Request body requires: category, milestone, message");
    const encouragement = await addEncouragement(category, milestone, message);
    res.status(201).send(encouragement);
  });

router
  .param("id", async (req, res, next, id) => {
    const encouragement = await getEncouragementById(id);
    if (!encouragement) return res.status(404).send("encouragement not found.");
    req.encouragement = encouragement;
    next();
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.encouragement);
  })
  .delete(async (req, res) => {
    const encouragement = await deleteEncouragement(req.encouragement.id);
    return res.status(204).send(encouragement);
  })
  .put(async (req, res) => {
    const { category, milestone, message } = req.body;
    if (!category || !milestone || !message)
      return res.status(400).send("Request body requires: category, milestone, message");
    const encouragement = await updateEncouragement(req.encouragement.id, category, milestone, message);
    return res.send(encouragement);
  });

  router
  .route("/:category/:milestone")
  .get(async (req, res) => {
    const { category, milestone } = req.params;
    const encouragements = await getEncouragement(category, milestone);
    res.send(encouragements);
  })

export default router;