import User from "../../models/user";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export default async (signUpDTO) => {
  /**
   * Assuming validations have been done already,
   * let's create the user.
   */
  const user = await User.create(signUpDTO);

  /**
   * Payload schema
   * @typedef AccessTokenPayload
   * @property {string} sub - the subscriber ID (a.k.a. the user ID)
   * @property {string} username - the user's username
   */
  const tokenPayload = {
    sub: user._id,
    username: user.username,
    role: user.role,
  };
  /**
   * We now need to generate two JSON web tokens:
   * 1. Access Token that is short-lived
   * 2. Refresh Token that is longer-lived
   */
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  /**
   * To ensure we can perform our refresh token rotation,
   * make sure the refresh token is added here.
   */
  user.refreshTokens = [...user.refreshTokens, refreshToken];
  await user.save();

  /**
   * @TODO - Schedule a CRON job to delete that refresh token once
   * it is expired
   */

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};
