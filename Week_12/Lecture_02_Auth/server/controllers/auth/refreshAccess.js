import { verify } from "jsonwebtoken";
import config from "../../config";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import removeRefreshFromRotation from "../../services/auth/removeRefreshFromRotation";

export default async (req, res, next) => {
  console.log("Is hitting?");
  try {
    const { refresh } = req.signedCookies;

    /**
     * Verify the refresh token
     */

    verify(refresh, config.tokens.refresh_secret, async (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized request" });
      }

      const tokenPayload = {
        sub: payload.sub,
        username: payload.username,
        role: payload.role,
      };

      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      /**
       * Take the renewed refresh token out of rotation
       */
      const user = await removeRefreshFromRotation(refresh);
      user.refreshTokens = [...user.refreshTokens, refreshToken];
      await user.save();
      res.cookie("refresh", refreshToken, config.cookies.options);

      return res.status(200).json({ user, accessToken });
    });
  } catch (error) {
    next(error);
  }
};
