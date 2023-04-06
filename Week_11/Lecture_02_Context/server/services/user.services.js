import User from "../models/user.model";

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) =>
  await User.create({ firstName, lastName, email, password, confirmPassword });

export const fetchUserByEmail = async (email) =>
  await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });

export const addBoardToUser = async (userId, boardId) =>
  await User.findByIdAndUpdate(userId, { $push: { boards: boardId } });
