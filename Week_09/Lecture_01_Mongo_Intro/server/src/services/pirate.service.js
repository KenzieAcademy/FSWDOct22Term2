import Pirate from "../models/pirate.model";

export const insertPirate = async (pirate) => {
  // Two ways you can insert a new document into the database.

  // 1. Use the model like a class constructor:
  // const newPirate = new Pirate(pirate);
  // // NOTE: If using the model like a class constructor, the constructor
  // // will simply create a local JS object of that pirate. To save
  // // this object to the database, you must also save it:
  // await newPirate.save();

  // 2. Use the model's built-in .create() method
  const newPirate = await Pirate.create(pirate);

  return newPirate;
};

export const fetchAllPirates = async () => {
  // Your mongoose model will contain a method called .find()
  // The .find() method will retrieve all documents from the model's collection.
  const allPirates = await Pirate.find();

  return allPirates;

  // If you provide an object to the .find() method, however, it will return the documents
  // that match that object.
  // For Example: Pirate.find({ rank: "Deck Hand" }) would return an array
  // of pirates with a rank of "Deck Hand"
};

export const fetchPirateById = async (id) => {
  // The mongoose model will also have a method called .findById().
  // Using it is fairly straightforward: pass the _id value into the method
  // and it will return the document in the collection with that _id
  const singlePirate = await Pirate.findById(id);

  return singlePirate;
};

export const deletePirate = async (id) => {
  // To delete a single document from a collection, use the model's
  // .findByIdAndDelete() method. It will find the document with the provide
  // value of _id, and delete that document from the collection.
  const deletedPirate = await Pirate.findByIdAndDelete(id);

  return deletedPirate;
};

export const updatePirate = async (id, updatedPirate) => {
  // The model will also contain a method called .findByIdAndUpdate()
  // In most scenarios, you will want to provide 3 arguments to this method
  // 1. The id
  // 2. The object containing the updated information
  // 3. An options object declaring that validations should be run, and
  // also that the NEWLY UPDATED VERSION of the document is what is returned

  const updatedPirate = await Pirate.findByIdAndUpdate(id, updatedPirate, {
    new: true,
    runValidators: true,
  });

  return updatedPirate;
};
