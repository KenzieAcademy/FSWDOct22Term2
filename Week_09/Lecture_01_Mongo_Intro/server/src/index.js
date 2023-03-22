import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { green, yellow, blue, red } from "chalk";
import { port, db_url } from "./configs/server.config";
import router from "./routes";

const app = express();

mongoose
  .connect(db_url)
  .then(() => console.log(`${green("[Database]")} Connection established!`))
  .catch((err) => console.log(`${red("[Database]")} Connection failed: `, err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () =>
  console.log(
    `${green("[Server]")} Now listening at ${yellow("localhost:")}${blue(port)}`
  )
);
