import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3001, () => console.log("Now listening on port 3001"));
