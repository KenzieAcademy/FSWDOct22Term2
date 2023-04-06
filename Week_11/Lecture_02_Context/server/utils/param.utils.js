export const newUserParams = (req) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  return [firstName, lastName, email, password, confirmPassword];
};

export const loginUserParams = (req) => {
  const { email, password } = req.body;
  return [email, password];
};

export const newBoardParams = (req) => {
  const { title } = req.body;
  const { _id } = req.user;

  return [title, _id];
};

export const getBoardsParams = (req) => [req.user._id];

export const getSingleBoardParams = (req) => [req.user._id, req.params.boardId];

export const createTaskParams = (req) => [
  req.user._id,
  req.params.boardId,
  req.body.columnId,
  req.body.title,
  req.body.description,
];

export const moveTaskToColumnParams = (req) => [
  req.user,
  req.params.boardId,
  req.body.toColumn,
  req.body.fromColumn,
  req.body.taskId,
];

export const deleteTaskParams = (req) => [
  req.user,
  req.params.boardId,
  req.query.column,
  req.params.taskId,
];

export const getTasksOnBoardParams = (req) => [req.user, req.params.boardId];
