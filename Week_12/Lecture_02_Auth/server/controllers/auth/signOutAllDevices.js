import config from "../../config";
import clearUserRefreshRotation from "../../services/auth/clearUserRefreshRotation";

export default async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await clearUserRefreshRotation(
      req.user
    );

    res.cookie("refresh", refreshToken, config.cookies.options);

    res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};
