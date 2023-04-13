import User from "../../models/user";

export default async (token) => {
  /**
   * Find the user with the refresh token in question
   */
  const userWithRefresh = await User.findOne({
    refreshTokens: token,
  });

  if (userWithRefresh) {
    userWithRefresh.refreshTokens = userWithRefresh.refreshTokens.filter(
      (t) => t !== token
    );
    await userWithRefresh.save();
  }

  return userWithRefresh;
};
