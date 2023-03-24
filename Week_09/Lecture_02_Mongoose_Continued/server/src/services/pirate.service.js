import Pirate from "../models/pirate.model";

export const insertPirate = async (pirate) => {
  const newPirate = await Pirate.create(pirate);

  return newPirate;
};

export const fetchAllPirates = async () => {
  const allPirates = await Pirate.find();

  return allPirates;
};

export const fetchPirateById = async (id) => {
  const singlePirate = await Pirate.findById(id);

  return singlePirate;
};

export const deletePirate = async (id) => {
  const deletedPirate = await Pirate.findByIdAndDelete(id);

  return deletedPirate;
};

export const updatePirate = async (id, updatedPirate) => {
  const pirate = await Pirate.findByIdAndUpdate(id, updatedPirate, {
    new: true,
    runValidators: true,
  });

  return pirate;
};

export const addParrotToPirate = async (id, parrot) => {
  // Option 1: The long way. (NOTE: This may or may not automatically validate, so keep that in mind)
  // 1. Find the pirate
  // 2. Add the new object to the nested array of documents
  // 3. Save the changes
  // const pirate = await fetchPirateById(id);

  // pirate.parrots.push(parrot);
  // await pirate.save();

  // Option 2: All at once using query operators
  const pirate = await Pirate.findByIdAndUpdate(
    id, // this is the pirate's _id
    { $push: { parrots: parrot } }, // This operator will add the parrot to the pirate's list of parrots (nested documents)
    { new: true, runValidators: true }
  );

  return pirate;
};

export const deleteParrotFromPirate = async (pirateId, parrotId) => {
  const pirateWithoutParrot = await Pirate.findByIdAndUpdate(
    pirateId,
    { $pull: { parrots: { _id: parrotId } } },
    { new: true, runValidators: true }
  );

  return pirateWithoutParrot;
};
