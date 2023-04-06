import createHttpError from "http-errors";

export const createError = (status, data) =>
  createHttpError(status, { error: data });
export const unauthorizedError = (data = "You must be logged in") =>
  createError(401, data);
export const notFoundError = (data = "Resource not found") =>
  createError(404, data);
export const validationError = (data = "Unprocessable entity") =>
  createError(422, data);
