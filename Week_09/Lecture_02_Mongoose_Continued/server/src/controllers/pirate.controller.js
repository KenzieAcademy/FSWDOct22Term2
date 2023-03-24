// This is where I will define all of the functions that are called
// by the routes

import {
  addParrotToPirate,
  deleteParrotFromPirate,
  deletePirate,
  fetchAllPirates,
  fetchPirateById,
  insertPirate,
  updatePirate,
} from "../services/pirate.service";

export const getAllPiratesHandler = async (req, res) => {
  try {
    const pirates = await fetchAllPirates();

    res.json(pirates);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getSinglePirateByIdHandler = async (req, res) => {
  const { pirateId } = req.params;
  try {
    const singlePirate = await fetchPirateById(pirateId);

    if (!singlePirate) {
      return res.sendStatus(404);
    }

    res.json(singlePirate);
  } catch (error) {
    if (error.name === "CastError") {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

export const createPirateHandler = async (req, res) => {
  try {
    const newPirate = await insertPirate(req.body);

    res.json(newPirate);
  } catch (error) {
    res.status(422).json(error);
  }
};

export const updatePirateByIdHandler = async (req, res) => {
  const { pirateId } = req.params;
  const updatedBody = req.body;
  try {
    const updatedPirate = await updatePirate(pirateId, updatedBody);

    if (!updatedPirate) {
      return res.sendStatus(404);
    }

    res.json(updatedPirate);
  } catch (error) {
    if (error.name === "CastError") {
      res.sendStatus(404);
    } else if (error.name === "ValidationError") {
      res.status(422).json(error);
    } else {
      res.sendStatus(500);
    }
  }
};

export const deletePirateByIdHandler = async (req, res) => {
  const { pirateId } = req.params;
  try {
    const deletedPirate = await deletePirate(pirateId);

    if (!deletedPirate) {
      return res.sendStatus(404);
    }

    // Return a status saying it worked (200 == "OK")
    res.sendStatus(200);
    // OR, return the deleted object
    // res.json(deletedPirate);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const addParrotToPirateHandler = async (req, res) => {
  const { pirateId } = req.params;
  const parrot = req.body;
  try {
    const pirateWithNewParrot = await addParrotToPirate(pirateId, parrot);

    res.json(pirateWithNewParrot);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const removeParrotFromPirateHandler = async (req, res) => {
  const { pirateId, parrotId } = req.params;
  try {
    const pirate = await deleteParrotFromPirate(pirateId, parrotId);

    res.json(pirate);
  } catch (error) {
    res.sendStatus(500);
  }
};
