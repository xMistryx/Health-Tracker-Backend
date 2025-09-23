import express from "express";
import { getHealthTips, getHealthTipById, addHealthTip, updateHealthTip, deleteHealthTip, getHealthTip } from "#db/queries/health_tips";

const router = express.Router()

router
  .route("/")
  .get(async (req, res) => {
    const healthTips = await getHealthTips();
    res.send(healthTips);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    const { category, tip } = req.body;
    if (!category || !tip)
      return res.status(400).send("Request body requires: category, tip");
    const healthTip = await addHealthTip(category, tip);
    res.status(201).send(healthTip);
  });

router
  .param("id", async (req, res, next, id) => {
    const healthTip = await getHealthTipById(id);
    if (!healthTip) return res.status(404).send("health_tip not found.");
    req.healthTip = healthTip;
    next();
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.healthTip);
  })
  .delete(async (req, res) => {
    const healthTip = await deleteHealthTip(req.healthTip.id);
    return res.status(204).send(healthTip);
  })
  .put(async (req, res) => {
    const { category, tip } = req.body;
    if (!category || !tip)
      return res.status(400).send("Request body requires: category, tip");
    const healthTip = await updateHealthTip(req.healthTip.id, category, tip);
    return res.send(healthTip);
  });

  router
  .route("/category/:category")
  .get(async (req, res) => {
    const { category } = req.params;
    const healthTips = await getHealthTip(category);
    res.send(healthTips);
  })

export default router;