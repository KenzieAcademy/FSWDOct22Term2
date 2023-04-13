import config from "../../config";
import { signUp } from "../../services/auth";

export default async (req, res, next) => {
  try {
    const userDTO = req.body;
    const { user, accessToken, refreshToken } = await signUp(userDTO);

    res.cookie("refresh", refreshToken, config.cookies.options);

    res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};
