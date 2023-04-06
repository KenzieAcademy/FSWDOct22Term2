import { Router } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwt_key } from "../config/app.config";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const userInDb = await User.findOne({ email });

    if (userInDb) {
      throw {
        name: "ValidationError",
        errors: { email: "Email already in use." },
      };
    }

    if (password !== confirmPassword) {
      throw {
        name: "ValidationError",
        errors: { password: "Passwords must match." },
      };
    } else if (password.length < 8 || password.length > 20) {
      throw {
        name: "ValidationError",
        errors: { password: "Password must be between 8 and 20 characters." },
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({ email, passwordHash });

    const tokenUser = {
      uid: newUser._id,
      email,
    };
    const token = jwt.sign(tokenUser, jwt_key);

    res.json({ token, uid: userInDb._id, email });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userInDb = await User.findOne({ email });

    const passwordMatch = userInDb
      ? bcrypt.compareSync(password, userInDb.passwordHash)
      : false;

    if (!passwordMatch)
      return res.status(422).json({ email: "Invalid email/password" });

    const tokenBody = {
      uid: userInDb._id,
      email,
    };

    const token = jwt.sign(tokenBody, jwt_key);

    res.json({ token, uid: userInDb._id, email });
  } catch (error) {}
});

export default router;
