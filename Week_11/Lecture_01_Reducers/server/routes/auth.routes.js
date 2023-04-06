import { Router } from "express";
import handleRequest from "../utils/handleRequest";
import { signInHandler, signUpHandler } from "../controllers/auth.controllers";
import { loginUserParams, newUserParams } from "../utils/param.utils";

const router = Router();

router.route("/signup").post(handleRequest(signUpHandler, newUserParams));
router.route("/signin").post(handleRequest(signInHandler, loginUserParams));

export default router;
