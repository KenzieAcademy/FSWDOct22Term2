import TaskBoard from "../models/taskBoard.model";
import { notFoundError, validationError } from "../utils/createError.utils";

export const findOneTaskBoard = async (userId, boardId) =>
  await TaskBoard.findOne({ owner: userId, _id: boardId });

export const findTaskBoards = async (userId) =>
  await TaskBoard.find({ owner: userId });

export const createTaskBoard = async (title, userId) =>
  await TaskBoard.create({
    owner: userId,
    title,
    columns: [
      { title: "Backlog" },
      { title: "In Progress" },
      { title: "Complete" },
    ],
  });

export const addTaskToBoard = async (
  userId,
  boardId,
  columnId,
  taskTitle,
  taskDescription
) => {
  const board = await TaskBoard.findOne({ _id: boardId, owner: userId });

  if (!board) throw notFoundError();

  if (!taskTitle) throw validationError({ title: "Title is required." });

  const columnToAddTo = board.columns.find(
    (col) => col._id.toString() === columnId
  );

  if (!columnToAddTo) throw notFoundError();

  columnToAddTo.tasks.push({ title: taskTitle, description: taskDescription });

  await board.save();

  console.log(board);
};

export const moveTaskToColumn = async (
  boardId,
  toColumnId,
  fromColumnId,
  taskId
) => {
  const board = await TaskBoard.findById(boardId);
  const columnToRemoveFrom = board.columns.find((col) =>
    col._id.equals(fromColumnId)
  );
  const columnToAddTo = board.columns.find((col) => col._id.equals(toColumnId));
  const task = columnToRemoveFrom.tasks.find((t) => t._id.equals(taskId));

  columnToRemoveFrom.tasks = columnToRemoveFrom.tasks.filter(
    (t) => !t._id.equals(taskId)
  );

  columnToAddTo.tasks = [...columnToAddTo.tasks, task];

  await board.save();
};

export const deleteTask = async (boardId, columnId, taskId) => {
  const board = await TaskBoard.findById(boardId);

  const columnToDeleteFrom = board.columns.find((c) => c._id.equals(columnId));

  if (!columnToDeleteFrom) throw notFoundError();

  const task = columnToDeleteFrom.tasks.find((t) => t._id.equals(taskId));

  columnToDeleteFrom.tasks = columnToDeleteFrom.tasks.filter(
    (t) => !t._id.equals(taskId)
  );
  await board.save();

  return task;
};

export const getTasksOnBoard = async (boardId) => {
  const board = await TaskBoard.findById(boardId);

  return board.columns.reduce((tasks, col) => {
    tasks.push(...col.tasks);
    return tasks;
  }, []);
};
