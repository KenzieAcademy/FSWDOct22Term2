export default (error, req, res, next) => {
  if (
    error.message === "Invalid submission" &&
    error.errors &&
    error.errors.username
  ) {
    res.status(403).json(error).end();
  } else {
    next(error);
  }
};
