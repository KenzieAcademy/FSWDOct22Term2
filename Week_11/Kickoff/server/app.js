import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { port, db_url } from "./config/app.config";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";

mongoose
  .connect(db_url)
  .then(() => console.log("[Database] Connection established."))
  .catch((err) => console.log("[Database] Error connecting to db: ", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => `[Server] Now listening on port ${port}`);
