// Object Equality Katas

// All of these functions should be PURE and have NO SIDE EFFECTS.
// Do not modify any of the input objects
// Always create a new array or object when returning
// For all functions, find instructions on MyKenzie.

// There are unit tests in `tests.js`.  These tests will automatically run in the console.

const isTheSameObject = function (a, b) {
  return a === b;
};

const isTheSameObjectShallow = function (a, b) {
  // Comparing key lengths
  let keysA = Object.keys(a);
  let keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (b[key] !== a[key]) return false;
  }

  return true;
};

const haveSameStructure = function (a, b) {
  let keysA = Object.keys(a);
  let keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!b.hasOwnProperty(key)) return false;
  }

  return true;
};

const createShallowCopy = function (object) {
  return { ...object };
};

const combineArrays = function (arrayOne, arrayTwo) {
  // Your Code Here!
  return [...arrayOne, ...arrayTwo];
};

const combineObjects = function (objectOne, objectTwo) {
  // Your Code Here!
  return { ...objectOne, ...objectTwo };
};

const copyObjectAndAddProperty = function (object, property, value) {
  return { ...object, [property]: value };
};

// STRETCH GOALS

const isTheSameObjectDeep = function (a, b) {
  if (a === b) return true;

  let keysA = Object.keys(a);
  let keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (typeof a[key] === "object" && typeof b[key] === "object") {
      let isSubObjEqual = isTheSameObjectDeep(a[key], b[key]);
      if (!isSubObjEqual) return false;
    } else if (typeof a[key] !== typeof b[key]) {
      return false;
    } else {
      if (a[key] !== b[key]) return false;
    }
  }

  return true;
};

export {
  combineArrays,
  combineObjects,
  copyObjectAndAddProperty,
  createShallowCopy,
  haveSameStructure,
  isTheSameObject,
  isTheSameObjectDeep,
  isTheSameObjectShallow,
};
