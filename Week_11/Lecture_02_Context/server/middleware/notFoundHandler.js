import { notFoundError } from "../utils/createError.utils";

const notFoundHandler = (req, res, next) => {
  next(notFoundError());
};

export default notFoundHandler;
