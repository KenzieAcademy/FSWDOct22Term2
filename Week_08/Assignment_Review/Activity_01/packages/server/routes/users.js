import { Router } from "express";
import data from "../data";

const router = Router();

router
  .route("/")
  .get((req, res) => {
    res.json(data);
  })
  .post((req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.sendStatus(422);
    }

    const newUser = { username, password };

    data.push(newUser);

    res.json(newUser);
  });

router
  .route("/:userIndex")
  .put((req, res) => {
    // Get the index of the user I need to change
    const { userIndex } = req.params;

    // Get the user's updated info from the req.body
    const { username, password } = req.body;

    // Update the specified user with the provided info
    const updatedUser = data[userIndex];

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    updatedUser.username = username;
    updatedUser.password = password;

    res.json(updatedUser);
  })
  .delete((req, res) => {
    const { userIndex } = req.params;

    if (!data[userIndex]) {
      return res.sendStatus(404);
    }

    const deletedUser = data.splice(userIndex, 1);

    res.json(deletedUser);
  });

export default router;
