import { sign } from "jsonwebtoken";
import config from "../config";

export const generateAccessToken = (payload) => {
  return sign(payload, config.tokens.access_secret, {
    expiresIn: "2h",
  });
};

export const generateRefreshToken = (payload) => {
  return sign(payload, config.tokens.refresh_secret, {
    expiresIn: "60d",
  });
};
