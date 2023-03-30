import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { port, db_url } from "./config/server.config";
import router from "./routes";
import path from "path";
import fileUpload from "express-fileupload";

mongoose
  .connect(db_url)
  .then(() => console.log("[Database] Connection established!"))
  .catch((err) => console.log("[Database] Connection failed:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

/*
  The express.static() middleware can be used to declare singular files or even
  entire directories of files to be publicly accessible through a request

  The function needs to be provided with a string path to the soon-to-be static
  directory

  path contains a method called .join() that can take multiple 
  path fragments and join them together.

  The __dirname path is the full path the current directory this file
  exists in
*/
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", router);

app.listen(port, () =>
  console.log(`[Server] Listening for requests at http://localhost:${port}`)
);
