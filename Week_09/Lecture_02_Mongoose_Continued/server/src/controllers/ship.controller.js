import {
  addPirateToShipCrew,
  fetchAllShipsWithCrew,
  insertShipWithoutCrew,
} from "../services/ship.service";

export const getAllShipsHandler = async (req, res) => {
  const ships = await fetchAllShipsWithCrew();
  res.json(ships);
};

export const createShipHandler = async (req, res) => {
  try {
    const newShip = await insertShipWithoutCrew(req.body);

    res.json(newShip);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422).json(error);
    } else {
      res.sendStatus(500);
    }
  }
};

export const addCrewmemberHandler = async (req, res) => {
  const { shipId, pirateId } = req.params;
  try {
    const updatedShip = await addPirateToShipCrew(shipId, pirateId);

    res.json(updatedShip);
  } catch (error) {
    res.sendStatus(500);
  }
};
