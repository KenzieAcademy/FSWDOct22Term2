import { Router } from "express";
import requireAuth from "../middleware/requireAuth";
import handleRequest from "../utils/handleRequest";
import {
  createBoardHandler,
  createTaskHandler,
  deleteTaskHandler,
  getBoardsHandler,
  getSingleBoardHandler,
  moveTaskToColumnHandler,
} from "../controllers/taskboard.controllers";
import {
  createTaskParams,
  deleteTaskParams,
  getBoardsParams,
  getSingleBoardParams,
  getTasksOnBoardParams,
  moveTaskToColumnParams,
  newBoardParams,
} from "../utils/param.utils";
import { getTasksOnBoardHandler } from "../controllers/auth.controllers";

const router = Router();

router
  .route("/")
  .get(handleRequest(getBoardsHandler, getBoardsParams))
  .post(handleRequest(createBoardHandler, newBoardParams));

router
  .route("/:boardId")
  .get(handleRequest(getSingleBoardHandler, getSingleBoardParams));

router
  .route("/:boardId/tasks")
  .get(handleRequest(getTasksOnBoardHandler, getTasksOnBoardParams))
  .post(handleRequest(createTaskHandler, createTaskParams));

router
  .route("/:boardId/tasks/:taskId")
  .put(handleRequest(moveTaskToColumnHandler, moveTaskToColumnParams))
  .delete(handleRequest(deleteTaskHandler, deleteTaskParams));

export default router;
