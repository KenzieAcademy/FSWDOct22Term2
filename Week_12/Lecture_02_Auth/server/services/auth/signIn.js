import User from "../../models/user";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export default async (loginDTO) => {
  /**
   * Check to see if a user with the provided username exists
   */
  const userInDb = await User.findOne({ username: loginDTO.username });

  const credentialMatch =
    userInDb === null
      ? false
      : await userInDb.comparePassword(loginDTO.password);

  if (!credentialMatch)
    throw {
      message: "Invalid submission",
      errors: { username: "Invalid username/password" },
    };

  const tokenPayload = {
    sub: userInDb._id,
    username: userInDb.username,
    role: userInDb.role,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  userInDb.refreshTokens = [...userInDb.refreshTokens, refreshToken];
  await userInDb.save();

  return { user: userInDb, accessToken, refreshToken };
};
