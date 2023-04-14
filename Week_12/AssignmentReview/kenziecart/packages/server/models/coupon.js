import { Schema, model } from "mongoose";

const CouponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
});

const Coupon = model("Coupon", CouponSchema);

export default Coupon;
