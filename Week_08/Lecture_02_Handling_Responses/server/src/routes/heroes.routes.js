import { Router } from "express";
import {
  createHero,
  getAllHeroes,
  getHeroById,
  removeHero,
  updateHero,
} from "../services/heroes.service";

const router = Router();

router
  .route("/")
  .get((req, res) => {
    const heroes = getAllHeroes();

    res.json(heroes);
  })
  .post((req, res) => {
    const { name, alias } = req.body;

    const newHero = createHero(name, alias);

    res.json(newHero);
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;

    const hero = getHeroById(id);

    if (hero) res.json(hero);
    else res.sendStatus(400);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, alias } = req.body;

    const updatedHero = updateHero(id, { name, alias, powers: [] });

    if (updatedHero) res.json(updatedHero);
    else res.sendStatus(400);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const deletedHero = removeHero(id);

    if (deletedHero) res.json(deletedHero);
    else res.sendStatus(400);
  });

export default router;
