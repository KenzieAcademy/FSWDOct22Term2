import { createUser, fetchUserByEmail } from "../services/user.services";
import { validationError } from "../utils/createError.utils";
import { signJwt } from "../utils/jwt.utils";

export const signUpHandler = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const user = await createUser(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );
  console.log(user);

  const token = signJwt(user);

  return { token, user: user.toJSON() };
};

export const signInHandler = async (email, password) => {
  const user = await fetchUserByEmail(email);

  if (!user) throw validationError({ email: "Invalid email/password" });

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch)
    throw validationError({ email: "Invalid email/password" });

  const token = signJwt(user);

  return { token, user: user.toJSON() };
};
