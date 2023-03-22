import { Schema, model } from "mongoose";

const HeroSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Hero name is required."],
    },
    alias: {
      type: String,
      default: "Identity Unknown",
    },
    powers: [String],
  },
  { timestamps: true }
);

const Hero = model("Hero", HeroSchema);

export default Hero;
