import express from "express";
import authRouter from "./auth";
import userRouter from "./users";
import postRouter from "./posts";

// Every request starting with /api is directed to this router
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("api endpoint");
});

// Requests to any url starting with /api/auth are directed to the authRouter
router.use("/auth", authRouter);
// Requests to any url starting with /api/users are directed to the userRouter
router.use("/users", userRouter);
// Requests to any url starting with /api/posts are directed to the postRouter
router.use("/posts", postRouter);

module.exports = router;
