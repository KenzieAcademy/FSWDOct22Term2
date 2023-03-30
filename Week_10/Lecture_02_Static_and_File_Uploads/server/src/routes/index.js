import { Router } from "express";
import fileRoutes from "./file.routes";
import postRoutes from "./post.routes";

const router = Router();

router.use("/files", fileRoutes);
router.use("/posts", postRoutes);

export default router;
