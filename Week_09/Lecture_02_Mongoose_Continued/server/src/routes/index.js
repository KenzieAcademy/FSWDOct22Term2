import { Router } from "express";
import pirateRouter from "./pirate.routes";
import shipRouter from "./ship.routes";

const router = Router();

router.use("/pirates", pirateRouter);
router.use("/ships", shipRouter);

export default router;
