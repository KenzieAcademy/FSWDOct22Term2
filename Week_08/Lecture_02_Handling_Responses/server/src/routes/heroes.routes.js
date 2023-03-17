import { Router } from "express";
import {
  addPowerToHero,
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
    else res.sendStatus(404);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, alias } = req.body;

    if (!name || !alias) {
      return res.sendStatus(422);
    }

    const updatedHero = updateHero(id, { name, alias, powers: [] });

    if (updatedHero) res.json(updatedHero);
    else res.sendStatus(404);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const deletedHero = removeHero(id);

    if (deletedHero) res.json(deletedHero);
    else res.sendStatus(404);
  });
console.log("hi");

router.put("/:id/powers", (req, res) => {
  const { id } = req.params;
  const { power } = req.body;

  const updatedHero = addPowerToHero(id, power);

  if (!updatedHero) {
    return res.sendStatus(404);
  }

  res.json(updatedHero);
});

export default router;
