import { Schema, model } from "mongoose";
import config from "../config";
import bcrypt from "bcryptjs";
import { Joi } from "celebrate";

export const signUpSchema = {
  body: Joi.object({
    username: Joi.string()
      .required()
      .min(4)
      .max(20)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        "string.empty": "Username is required.",
        "string.pattern.base":
          "Username can only contain letters (a-z and A-Z), numbers (0-9) and underscores (_)",
        "string.min": "Username must be at least 4 characters.",
        "string.max": "Username cannot be longer than 20 characters.",
      }),
    email: Joi.string().required().email().message({
      "string.empty": "Email is required.",
      "string.email":
        'Must be a valid email address format (e.g. "username@domain.com"',
    }),
    password: Joi.string().required().min(8).max(30).messages({
      "string.empty": "Password is required.",
      "string.min": "Password cannot contain fewer than 8 characters.",
      "stirng.max": "Password cannot contain more than 30 characters.",
    }),
    confirmPassword: Joi.equal(Joi.ref("password"))
      .messages({
        "any.only": "Passwords must match.",
        "any.required": "Password confirmation is required.",
      })
      .required(),
  }),
};

export const signInSchema = {
  body: Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username is required to log in.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required to log in.",
    }),
  }),
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      match: config.patterns.username,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: config.patterns.email,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "mod", "member", "user"],
      default: "user",
    },
    /**
     * In order to use a refresh token rotation, we'll need
     * to keep track of which refresh tokens are available
     */
    refreshTokens: [String],
  },
  { timestamps: true }
);

/**
 * The virtual password and confirmPassword fields are used to handle the data transfer object
 * (DTO) that will be provided when creating a new user.
 *
 * The form will not have "passwordHash", but rather "password" and
 * "confirmPassword" fields.
 */
UserSchema.virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (value) {
    this._password = value;
  });

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

/**
 * Before saving the user DTO as the User in the database,
 * let's make sure to encrypt the password
 */
UserSchema.pre("validate", function (next) {
  if (this.isNew) {
    /**
     * Generate a salt to encrypt with
     */
    const salt = bcrypt.genSaltSync(12);
    this.passwordHash = bcrypt.hashSync(this._password, salt);
  }

  next();
});

/**
 * You can "bake in" methods to the objects you get back from
 * your various database queries.
 *
 * This one will perform the password comparison, for example.
 */
UserSchema.method("comparePassword", async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
});

/**
 * Ensure that when a user document is converted to JSON for the response,
 * the passwordHash is not included, nor is the refreshTokens array
 */
UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["passwordHash"];
    delete ret["refreshTokens"];
    return ret;
  },
});

const User = model("User", UserSchema);

export default User;
