export default (error, req, res, next) => {
  if (error.details && error.details instanceof Map) {
    const responseErrors = {
      message: "Invalid submission",
      errors: {},
    };

    error.details.forEach((key) => {
      key.details.forEach((subKey) => {
        responseErrors.errors[subKey.context.key] = subKey.message;
      });
    });

    res.status(422).json(responseErrors).end();
  } else {
    next(error);
  }
};
