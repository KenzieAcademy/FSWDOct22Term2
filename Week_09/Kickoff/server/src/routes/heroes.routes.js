import { Router } from "express";
import Hero from "../models/hero.model";

const router = Router();

// All route URL's in this router start with /api/heroes
router
  .route("/")
  .get(async (req, res) => {
    const heroes = await Hero.find(); // This will query for all documents in the Hero collection

    res.json(heroes);
  })
  .post(async (req, res) => {
    const { name, alias } = req.body;

    try {
      const newHero = await Hero.create({ name, alias });

      res.json(newHero);
    } catch (error) {
      res.status(400).json(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const hero = await Hero.findById(id);

      if (hero) res.json(hero);
      else res.status(404).json({ error: "Hero does not exist." });
    } catch (error) {
      res.sendStatus(400).json(error);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, alias } = req.body;
    try {
      const updatedHero = await Hero.findByIdAndUpdate(
        id,
        { name, alias },
        { new: true, runValidators: true }
      );

      if (updatedHero) res.json(updatedHero);
      else res.sendStatus(404);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedHero = await Hero.findByIdAndDelete(id);

      if (deletedHero) res.json(deletedHero);
      else res.sendStatus(404);
    } catch (error) {
      res.sendStatus(400);
    }
  });

export default router;
