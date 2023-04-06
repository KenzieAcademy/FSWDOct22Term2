const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError" && error.errors) {
    const errorRes = {};
    Object.keys(error.errors).forEach((key) => {
      // console.log(error.errors[key]);
      errorRes[key] = error.errors[key].properties.message;
    });
    return res.status(422).json(errorRes);
  } else if (error.status === 422) {
    return res.status(422).json(error.error);
  } else {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default errorHandler;
