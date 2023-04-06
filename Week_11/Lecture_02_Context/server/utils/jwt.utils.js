import { jwt_secret } from "../config/app.config";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const signJwt = (user) => {
  const payload = {
    uid: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, jwt_secret);
  return token;
};

export const verifyJwt = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, payload) => {
      if (err) reject(err);

      resolve(payload);
    });
  });
