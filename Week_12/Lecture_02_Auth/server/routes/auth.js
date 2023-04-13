import { Router } from "express";
import signUp from "../controllers/auth/signUp";
import { celebrate } from "celebrate";
import { signInSchema, signUpSchema } from "../models/user";
import signIn from "../controllers/auth/signIn";
import verifyAccessToken from "../middleware/verifyAccessToken";
import verifyAuthorization from "../middleware/verifyAuthorization";
import refreshAccess from "../controllers/auth/refreshAccess";
import signOut from "../controllers/auth/signOut";
import signOutAllDevices from "../controllers/auth/signOutAllDevices";

const router = Router();

router.route("/signup").post(celebrate(signUpSchema), signUp);
router.route("/signin").post(celebrate(signInSchema), signIn);
router.route("/refresh").all(refreshAccess);
router.route("/signout").all(verifyAccessToken, verifyAuthorization(), signOut);
router
  .route("/signout/devices")
  .all(verifyAccessToken, verifyAuthorization(), signOutAllDevices);

export default router;
