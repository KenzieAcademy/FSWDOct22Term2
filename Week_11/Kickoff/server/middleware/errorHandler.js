const errorHandler = (error, req, res, next) => {
  let errRes = {};
  switch (error.name) {
    case "ValidationError":
      for (let key of Object.keys(error.errors)) {
        if (typeof error.errors[key] === "string") {
          errRes[key] = error.errors[key];
        } else {
          errRes[key] = error.errors[key].properties.message;
        }
      }
      return res.status(422).json(errRes);
    default:
      return res.sendStatus(500);
  }
};

export default errorHandler;
