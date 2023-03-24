import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const ShipSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  voyageCount: {
    type: Number,
    default: 0,
  },
  crew: [
    {
      type: ObjectId,
      ref: "Pirate",
    },
  ],
});

const Ship = model("Ship", ShipSchema);

export default Ship;
