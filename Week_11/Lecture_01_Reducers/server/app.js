import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { db_url, port } from "./config/app.config";
import { green, yellow, blue } from "chalk";
import requestLogger from "./middleware/logger";
import notFoundHandler from "./middleware/notFoundHandler";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";

mongoose.connect(db_url);

mongoose.connection.on("connected", () => {
  console.log(`${green("[Database]")} Connection established.`);
});

mongoose.connection.on("error", (err) => {
  console.log(`${red("[Database]")} Connection failed: `, err);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api", router);

// app.all("*", notFoundHandler);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `${green(
      "[Server]"
    )} Connection established. Now listening for HTTP requests at ${blue(
      "http://localhost:"
    )}${yellow(port)}`
  )
);
