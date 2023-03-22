import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";
import { PORT, DB_URL } from "./configs/server.config";

mongoose
  .connect(DB_URL) // asynchronous
  .then(() => console.log("[Database] Connection Established."))
  .catch((err) => console.log("[Database] An error occurred:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => console.log(`[Server] Now listening on port ${PORT}`));
