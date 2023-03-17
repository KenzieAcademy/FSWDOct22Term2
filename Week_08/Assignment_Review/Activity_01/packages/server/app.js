import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes";

const PORT = 3001;

const app = express();

// api middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// api router
app.use("/api", router);

export default app;
