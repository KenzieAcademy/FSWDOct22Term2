import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

// The Schema class constructor technically does not require any arguments.
// However, to provide structure, it should accept a minimum of 1 argument:
// the object defining the shape of documents in a collection
const PirateSchema = new Schema({
  // name: String, // if you just set the data type, you don't need a whole object
  name: {
    type: String, // This means the name of every pirate in the collection should be a string
    required: true, // You can also decide whether or not a property is required
    minLength: 2, // For strings, you can require that the string have a minimum length
    maxLength: 25, // or a maximum length!
  },
  nickName: {
    type: String,
    default: "N/A", // if no nickName is provided, the string "N/A" will be used
  },
  rank: {
    type: String,
    required: true,
    enum: ["Captain", "First Mate", "Deck Hand", "Yarr"],
  },
  parrots: [
    {
      name: {
        type: String,
        required: true,
      },
      species: {
        type: String,
        required: true,
      },
    },
  ],
  hasPegLeg: {
    type: Boolean,
    default: false,
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      // You can also use a completely custom validation
      validator: function (valueProvided) {
        // This function returns a boolean based on whether the date provided is 18 years ago
        var today = new Date();
        var birthDate = new Date(valueProvided);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age >= 18;
      },
      message: () =>
        "Yarr, ye need be at least eighteen revolutions 'round the sun ter join me crew.",
    },
  },
  catchPhrase: {
    type: String,
    default: "N/A",
    match: /^[^0-9]+$/, // I can require that the catchPhrase contain zero numbers using RegExp matching
  },
  ship: {
    type: ObjectId,
    ref: "Ship",
  },
});

// The model function should take 2 arguments:
// 1. a string for the name of the collection these rules should apply
// 2. the schema that the collection should adhere to
const Pirate = model("Pirate", PirateSchema);

export default Pirate;
