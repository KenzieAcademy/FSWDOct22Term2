/*
  Scenario 1: I have gone out and purchased a new vehicle
  While at the dealer, another customer walks in, sees the car 
  I am purchasing, and says "I want that same car!"
*/

// const myCar = {
//   make: "Subaru",
//   model: "Impreza",
//   year: 2019,
//   color: "Dark Grey",
// };

// const otherCustomerCar = {
//   make: "Subaru",
//   model: "Impreza",
//   year: 2019,
//   color: "Dark Grey",
// };

// console.log(myCar === otherCustomerCar);

// console.log(myCar.make === otherCustomerCar.make);

// /*
//   Scenario 2: My partner and I go to the dealer
//   and purchase a car together.
// */

// const myCar2 = {
//   make: "Chevrolet",
//   model: "Camaro",
//   year: 1967,
//   color: "Black",
// };

// const partnerCar = myCar2;

// console.log(myCar2 === partnerCar);

// /*
//   Primitive data types (i.e. numbers, booleans, string)
//   are stored in memory as their literal values
// */

// const str1 = "Hello";
// const str2 = "Hello";

// console.log(str1 === str2);

// const num1 = 25;
// const num2 = 25;

// console.log(num1 === num2);

// /*
//   Complex data types (i.e. Objects, Arrays) are stored in memory
//   differently. Objects have their key-value pairs stored in a
//   heap somewhere in memory.
// */

// const myObj = {
//   name: "Cody",
//   age: 32,
// };

// const yourObj = {
//   name: "Cody",
//   age: 32,
// };

/*
  Scenario 3: Building off of scenario 1, myself and the stranger
  both buy the "same" (but not really) car.

  I take my car home and decide to paint my car orange.
*/

// const myCar = {
//   make: "Subaru",
//   model: "Impreza",
//   year: 2019,
//   color: "Dark Grey",
// };

// const otherCustomerCar = {
//   make: "Subaru",
//   model: "Impreza",
//   year: 2019,
//   color: "Dark Grey",
// };

// myCar.color = "Burnt orange";

/*
  Scenario 4: Building off of scenario 2, where my partner
  and I join together and buy the same actual car.

  I decide to paint flames down the side of it.
*/

const myCar2 = {
  make: "Chevrolet",
  model: "Camaro",
  year: 1967,
  color: "Black",
};

const partnerCar = myCar2;

myCar2.color = "Black with flames on the side";

// Scenario: I need to make a copy of my car
// const myCarCopy = {
//   make: myCar2.make,
//   model: myCar2.model,
//   year: myCar2.year,
//   color: myCar2.color,
// };

/*
  Solution 1 (Not Recommended): Converting the object to an array of just its properties,
  looping through the array, and setting the values accordingly
*/
// const properties = Object.keys(myCar2);
// const myCarCopy = {};
// for (let key of properties) {
//   myCarCopy[key] = myCar2[key];
// }

/*
  Solution 2: The quickest (but kind of dirtiest) way
*/
// let stringVersionOfCar = JSON.stringify(myCar2);
// const copyOfCar = JSON.parse(stringVersionOfCar);

/* 
  Solution 3: Spread Operator
*/

const iDoNotKnow = { ...myCar2 };

// console.log(iDoNotKnow);

/*
  Scenario: I want to make a copy of myCar2,
  but I hate the flames on the side...
*/

// HINT HINT THIS IS IMPORTANT
const newFasterCopy = { ...myCar2, color: "Black with racing stripes" };

// console.log(newFasterCopy);

/* 
  We can use the Spread Operator with arrays too!
*/

const myData = [1, 2, 3, 4];
const otherData = [5, 6, 7, 8];

const newData = [...myData, ...otherData];

const ohNoItsRuined = {
  name: "Sad person",
  whySad: {
    because: "What if an object is nested",
    as: "a property of an object?",
  },
};

// const orIsIt = { ...ohNoItsRuined };
// // The biggest issue with spread operators
// // is that it only creates a SHALLOW copy

// ohNoItsRuined.whySad.as = "????";

// const dirtyCopy = JSON.parse(JSON.stringify(ohNoItsRuined));
// console.log(dirtyCopy.whySad === ohNoItsRuined.whySad);

class SomeClass {
  constructor() {
    this.property = "some value";
    this.nestedObject = {
      some: "value",
      oh: "dear",
    };
  }
}

const custom = new SomeClass();

const copy = JSON.parse(JSON.stringify(custom));

// Recursive Functions: functions that call themselves
function clone(object) {
  // Break case
  if (object === null) {
    return object;
  }

  // What if the nested object is an array?
  if (Array.isArray(object)) {
    return object.map((element) => clone(element));
  }

  if (typeof object === "object") {
    const cloneObj = {};

    for (let key of Object.keys(object)) {
      cloneObj[key] = clone(object[key]);
    }

    return cloneObj;
  }

  return object;
}

const someComplexObject = {
  field: "value",
  nestedArray: [1, 2, { name: "Cody" }, [1, 2, 3]],
  nestedObject: {
    heroName: "Iron Man",
    alias: "Tony Stark",
    powers: ["Flight", "Money", "Smarts"],
  },
};

const complexClone = clone(someComplexObject);
// console.log(complexClone.nestedObject === someComplexObject.nestedObject);

// Option 2: Use a library

// Scenario: Check if two objects are deep copies of each other:
const obj1 = {
  // After Object.keys() ==> ['name', 'age']
  name: "Cody",
  age: 32,
};

const obj2 = {
  // After Object.keys() ==> ['age', 'name']
  age: 32,
  name: "Cody",
};

function isShallowCopy(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // fast fail: if the objects have different numbers of keys
  if (aKeys.length !== bKeys.length) return false;

  // Loop through one set of keys, and check if the value of the 2nd object
  // at that key matches
  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}
