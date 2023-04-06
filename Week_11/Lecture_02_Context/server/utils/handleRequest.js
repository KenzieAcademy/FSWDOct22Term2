const handleRequest = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req) : [];
  try {
    const result = await promise(...boundParams);
    res.json(result || "OK");
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export default handleRequest;
