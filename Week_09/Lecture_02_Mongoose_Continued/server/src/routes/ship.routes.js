import { Router } from "express";
import {
  addCrewmemberHandler,
  createShipHandler,
  getAllShipsHandler,
} from "../controllers/ship.controller";

// All routes have URL's that start with "/api/ships"
const router = Router();

router.route("/").get(getAllShipsHandler).post(createShipHandler);

router.route("/:shipId/crew/:pirateId").put(addCrewmemberHandler);

export default router;
