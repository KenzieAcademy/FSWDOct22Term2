import { Router } from "express";
import Coupon from "../models/coupon";

const router = Router();

router.get("/create", async (req, res, next) => {
  try {
    const { code, discount } = req.query;

    await Coupon.create({
      code: code.toLowerCase(),
      discount,
    });

    res.json("OK");
  } catch (error) {
    next(error);
  }
});

router.get("/verify", async (req, res, next) => {
  try {
    const { code } = req.query;

    const coupon = await Coupon.findOne({ code: code.toLowerCase() });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ discount: coupon.discount });
  } catch (error) {
    next(error);
  }
});

export default router;
