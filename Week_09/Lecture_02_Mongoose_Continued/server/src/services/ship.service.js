import Pirate from "../models/pirate.model";
import Ship from "../models/ship.model";

export const fetchAllShipsWithCrew = async () => {
  const ships = await Ship.find().populate("crew");
  return ships;
};

export const insertShipWithoutCrew = async (ship) => {
  const newShip = await Ship.create(ship);

  return newShip;
};

export const addPirateToShipCrew = async (shipId, pirateId) => {
  // The biggest downside to using Object References:
  // If two documents reference each other, you need to update both
  const shipWithNewCrew = await Ship.findByIdAndUpdate(
    shipId,
    {
      $addToSet: { crew: pirateId },
    },
    { new: true, runValidators: true }
  );
  const updatedPirate = await Pirate.findByIdAndUpdate(
    pirateId,
    {
      ship: shipId,
    },
    { new: true, runValidators: true }
  );

  return shipWithNewCrew;
};
