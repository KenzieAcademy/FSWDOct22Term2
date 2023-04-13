import { Router } from "express";
import joiErrorHandler from "../middleware/joiErrorHandler";
import apiRoutes from "../routes/api";
import authRoutes from "../routes/auth";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/api", apiRoutes);

export default routes;
