import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import router from "./routes";

mongoose
  .connect(config.mongoDB.url)
  .then(() => console.log("[Database] Connection established"))
  .catch((err) => console.log("[Database] Connection failed: ", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(config.port, () =>
  console.log(`[Server] Now listening on port ${config.port}`)
);
