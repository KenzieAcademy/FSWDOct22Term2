import config from "../../config";
import signIn from "../../services/auth/signIn";

export default async (req, res, next) => {
  try {
    const loginDTO = req.body;

    const { user, accessToken, refreshToken } = await signIn(loginDTO);

    /**
     * To ensure our refresh token rotation is working properly, we should
     * delete any token that was provided in the cookie from the user's refresh
     * tokens
     */
    const { refresh } = req.signedCookies;

    if (refresh && user.refreshTokens.includes(refresh)) {
      console.log(refresh);
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refresh
      );
      await user.save();
    }

    res.cookie("refresh", refreshToken, config.cookies.options);

    res.status(200).json({ user: user.toJSON(), accessToken });
  } catch (error) {
    next(error);
  }
};
