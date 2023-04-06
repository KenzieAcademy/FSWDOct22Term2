import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minLength: [2, "First name must be at least 2 characters."],
      maxLength: [30, "First name cannot be longer than 30 characters."],
      match: [
        /[a-zA-Z'-]/,
        "First name cannot contain numbers or special characters other than ' and -",
      ],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minLength: [2, "Last name must be at least 2 characters."],
      maxLength: [30, "Last name cannot be longer than 30 characters."],
      match: [
        /[a-zA-Z'-]/,
        "Last name cannot contain numbers or special characters other than ' and -",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "Invalid email address.",
      ],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    boards: [{ type: ObjectId, ref: "TaskBoard" }],
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (value) {
    this._password = value;
    const salt = bcrypt.genSaltSync(12);
    this.passwordHash = bcrypt.hashSync(value, salt);
  });

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre("validate", async function (next) {
  console.log(this._password);
  console.log(this._confirmPassword);
  if (this._password) {
    if (this._password.length < 8) {
      this.invalidate("password", "Password cannot contain fewer than 8.");
    } else if (this._password.length > 20) {
      this.invalidate(
        "password",
        "Password cannot contain more than 20 characters."
      );
    }

    if (!this._confirmPassword) {
      this.invalidate("confirmPassword", "Password must be confirmed.");
    } else if (this._password !== this._confirmPassword) {
      this.invalidate("confirmPassword", "Passwords must match.");
    }
  }

  const existingUser = await model("User").findOne({
    email: { $regex: new RegExp(this.email, "i") },
  });

  if (this.isNew) {
    if (existingUser) {
      this.invalidate("email", "Email is already registered.");
    }

    if (!this._password) {
      this.invalidate("password", "Password is required.");
    }
  } else {
    if (!this._id.equals(existingUser._id)) {
      this.invalidate("email", "That email is already in use by another user.");
    }
  }

  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const passwordMatch = await bcrypt.compare(
    candidatePassword,
    this.passwordHash
  );

  return passwordMatch;
};

const convertForResponse = (doc, ret, opts) => {
  delete ret["passwordHash"];
  delete ret["__v"];
  delete ret["created_at"];
  delete ret["updated_at"];
  return ret;
};

UserSchema.set("toJSON", {
  transform: convertForResponse,
});

UserSchema.set("toObject", {
  transform: convertForResponse,
});

const User = model("User", UserSchema);

export default User;
