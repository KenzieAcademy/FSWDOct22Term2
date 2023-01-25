function copyObjectAndAddProperty(object, property, value) {
  const copy = {};
  return copy;
}

const obj = { instructor: "Cody" };
const result = copyObjectAndAddProperty(obj, "facilitator", "Jon");

// Output value: { instructor: "Cody", facilitator: "Jon" }
// NOTE: This should be a COPY, so:
console.log(obj === result); // should be false
