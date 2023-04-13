import { verify } from "jsonwebtoken";
import config from "../config";

/**
 * This middleware function will verify that the
 * request is being made by a user authorized
 * to access a given resource.
 */

export default async (req, res, next) => {
  /**
   * Attempt to access the bearer token
   */
  const authorizationBearer = req.get("authorization");

  console.log(authorizationBearer);

  if (!authorizationBearer) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  /**
   * Get the access token that was initially provided
   * by our server
   */
  const accessToken = authorizationBearer.replace("Bearer ", "");

  /**
   * Decrypt that access token to ensure it is real
   */
  verify(accessToken, config.tokens.access_secret, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Access expired", refreshUrl: "/auth/refresh" });
      }
      return res.status(401).json({ message: "Unauthorized request" });
    }

    req.user = payload.sub;
    req.role = payload.role;
    next();
  });
};
