import { getTasksOnBoard } from "../services/taskboard.services";
import { createUser, fetchUserByEmail } from "../services/user.services";
import {
  notFoundError,
  unauthorizedError,
  validationError,
} from "../utils/createError.utils";
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

export const getTasksOnBoardHandler = async (user, boardId) => {
  if (!user.boards.some((tb) => tb._id.equals(boardId))) throw notFoundError();

  return await getTasksOnBoard(boardId);
};
