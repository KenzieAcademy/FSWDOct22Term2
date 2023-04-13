import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "../config";
import routes from "./routes";
import joiErrorHandler from "../middleware/joiErrorHandler";
import loginErrorHandler from "../middleware/loginErrorHandler";

export default (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser(config.cookies.secret));

  app.use(routes);

  app.use(joiErrorHandler);
  app.use(loginErrorHandler);
  return app;
};
