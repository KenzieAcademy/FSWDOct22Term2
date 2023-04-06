import jwt from "jsonwebtoken";
import { jwt_key } from "../config/app.config";
import User from "../models/user.model";

const requireAuth = async (req, res, next) => {
  const auth = req.get("authorization");

  if (!auth) next({ name: "AuthenticationError", message: "You must log in." });

  const token = auth.replace("Bearer ", "");

  jwt.verify(token, jwt_key, (err, payload) => {
    if (err) next({ name: "AuthenticationError", message: "You must log in." });

    User.findById(payload.uid)
      .then((user) => {
        if (!user)
          next({ name: "AuthenticationError", message: "You must log in." });

        req.user(user);
        next();
      })
      .catch((err) => next(err));
  });
};

export default requireAuth;
