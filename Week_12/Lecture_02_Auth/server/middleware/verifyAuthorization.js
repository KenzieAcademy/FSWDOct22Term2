import User from "../models/user";

const roleTable = {
  admin: 1,
  mod: 2,
  member: 3,
  user: 4,
};

export default (requiredRole = "user") =>
  async (req, res, next) => {
    if (roleTable[requiredRole] < roleTable[req.role]) {
      return res.status(403).json({ message: "Invalid role" });
    }

    // 1. Verify the user exists
    const user = await User.findById(req.user);
    // 2. Verify the user's role matches what was provided by the JWT
    if (user.role !== req.role) {
      user.refreshTokens = [];
      res.clearCookie("refresh");
      return res
        .status(403)
        .json({ message: "Try it again and get your IP blacklisted >:(" });
    }

    next();
  };
