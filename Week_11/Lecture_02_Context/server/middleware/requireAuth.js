import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/app.config";
import { unauthorizedError } from "../utils/createError.utils";
import User from "../models/user.model";
import { verifyJwt } from "../utils/jwt.utils";

const requireAuth = async (req, res, next) => {
  const auth = req.get("authorization");

  if (!auth) return next(unauthorizedError());

  const token = auth.replace("Bearer ", "");

  if (!token) return next(unauthorizedError());

  verifyJwt(token)
    .then((payload) => {
      User.findById(payload.uid)
        .then((user) => {
          if (!user) return next(unauthorizedError());

          req.user = user;
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(unauthorizedError()));
};

export default requireAuth;
