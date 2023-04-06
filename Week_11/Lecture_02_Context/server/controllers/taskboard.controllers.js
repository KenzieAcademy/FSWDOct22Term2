import {
  addTaskToBoard,
  createTaskBoard,
  deleteTask,
  findOneTaskBoard,
  findTaskBoardById,
  findTaskBoards,
  moveTaskToColumn,
} from "../services/taskboard.services";
import { addBoardToUser } from "../services/user.services";
import { notFoundError, unauthorizedError } from "../utils/createError.utils";

export const createBoardHandler = async (title, userId) => {
  const board = await createTaskBoard(title, userId);
  await addBoardToUser(userId, board._id);
  return board;
};

export const getBoardsHandler = async (userId) => await findTaskBoards(userId);

export const getSingleBoardHandler = async (userId, boardId) => {
  const board = await findOneTaskBoard(userId, boardId);

  if (!board) throw notFoundError();

  return board;
};

export const createTaskHandler = async (
  userId,
  boardId,
  columnId,
  title,
  description
) => {
  await addTaskToBoard(userId, boardId, columnId, title, description);
};

export const moveTaskToColumnHandler = async (
  user,
  boardId,
  toColumnId,
  fromColumnId,
  taskId
) => {
  console.log(user);
  if (!user.boards.find((oid) => oid.equals(boardId))) throw notFoundError();

  await moveTaskToColumn(boardId, toColumnId, fromColumnId, taskId);
};

export const deleteTaskHandler = async (user, boardId, columnId, taskId) => {
  if (!user.boards.some((tb) => tb._id.equals(boardId))) throw notFoundError();

  await deleteTask(boardId, columnId, taskId);
};
