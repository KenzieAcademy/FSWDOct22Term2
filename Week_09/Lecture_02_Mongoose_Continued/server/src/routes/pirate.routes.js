import { Router } from "express";
import {
  addParrotToPirateHandler,
  createPirateHandler,
  deletePirateByIdHandler,
  getAllPiratesHandler,
  getSinglePirateByIdHandler,
  removeParrotFromPirateHandler,
  updatePirateByIdHandler,
} from "../controllers/pirate.controller";

// All routes in this router have a URL starting with "/api/pirates"

const router = Router();

// URL: /api/pirates
router.route("/").get(getAllPiratesHandler).post(createPirateHandler);

// URL: /api/pirates/:pirateId
router
  .route("/:pirateId")
  .get(getSinglePirateByIdHandler)
  .put(updatePirateByIdHandler)
  .delete(deletePirateByIdHandler);

router.route("/:pirateId/parrots").post(addParrotToPirateHandler);

router
  .route("/:pirateId/parrots/:parrotId")
  .delete(removeParrotFromPirateHandler);

export default router;
