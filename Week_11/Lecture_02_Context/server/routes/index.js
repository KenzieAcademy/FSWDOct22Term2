import { Router } from "express";
import authRoutes from "./auth.routes";
import taskBoardRoutes from "./taskboard.routes";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/boards", requireAuth, taskBoardRoutes);

export default router;
