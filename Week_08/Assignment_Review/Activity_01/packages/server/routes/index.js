import { Router } from 'express'
import userRouter from "./users";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

router.use("/users", userRouter);

export default router
