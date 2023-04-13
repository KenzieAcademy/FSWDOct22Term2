import User from "../../models/user";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export default async (userId) => {
  const user = await User.findById(userId);

  const tokenPayload = {
    sub: user._id,
    username: user.username,
    role: user.role,
  };
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  user.refreshTokens = [refreshToken];

  await user.save();

  return { user: user.toJSON(), accessToken, refreshToken };
};
