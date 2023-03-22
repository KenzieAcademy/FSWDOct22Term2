import { Router } from "express";
import heroRoutes from "./heroes.routes";
const router = Router();

router.use("/heroes", heroRoutes);

export default router;
