import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import keys from "./config/keys";
import router from "./routes";
import { requestLogger, errorHandler } from "./middleware";
import seedDatabase from "./seedDatabase";

const createError = require("http-errors");

mongoose.connect(keys.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
  seedDatabase();
});

mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

const app = express();

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);

app.get("/add/:x/:y", (req, res) => {
  const { x, y } = req.params;

  // Ensure that x and y are both numbers
  if (isNaN(x) || isNaN(y)) {
    return res.status(400).json({ error: "X and Y must be numbers." });
  }

  // Add them together
  const sum = Number(x) + Number(y);

  res.json({ sum: sum });
});

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "You must provide a name." });
  } else {
    return res.json({ message: `Hello, ${name}!` });
  }
});

app
  .route("/teapot")
  .get((req, res) => res.status(418).send(true))
  .post((req, res) => {
    const { areYouATeapot } = req.body;

    if (areYouATeapot === true) {
      res.status(418).json({ amIATeapot: "yes" });
    } else {
      res.status(200).json({ amIATeapot: "no" });
    }
  });

// api router
app.use(keys.app.apiEndpoint, router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "NotFound"));
});

// error handler
app.use(errorHandler);

module.exports = app;
