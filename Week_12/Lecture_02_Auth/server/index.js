import express from "express";
import loaders from "./loaders";
import config from "./config";

const startServer = async () => {
  const app = express();

  await loaders(app);

  app.listen(config.port, () =>
    console.log(`[Server] Now listening on port ${config.port}`)
  );
};

startServer();
