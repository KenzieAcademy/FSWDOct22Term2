import removeRefreshFromRotation from "../../services/auth/removeRefreshFromRotation";

export default async (req, res, next) => {
  try {
    /**
     * 1. Delete the refresh token from rotation
     * 2. Clear the cookie
     */
    const { refresh } = req.signedCookies;

    const user = await removeRefreshFromRotation(refresh);
    res.clearCookie("refresh");

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
