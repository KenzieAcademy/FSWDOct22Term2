const cars = [
  {
    make: "Ford",
    model: "Fiesta",
    year: 2011,
    numDoors: 4,
  },
  {
    make: "Subaru",
    model: "Impreza",
    year: 2019,
    numDoors: 4,
  },
  {
    make: "GMC",
    model: "Sierra",
    year: 2016,
    numDoors: 4,
  },
  {
    make: "Porsche",
    model: "Boxster",
    year: 2001,
    numDoors: 2,
  },
];

// Warmup 1: Loop through the array and print the make and model of each car.
// Either a for or for-of loop
// function printCarInfo(cars) {
//   for (let car of cars) {
//     // Format the console log so it prints as "Make: ____, Model: _____"
//     console.log(`Make: ${car.make}, Model: ${car.model}`);
//   }
// }

// printCarInfo(cars);

// // Warmup 2: Create a new array. Loop through the cars array and only push cars
// // made after 2012 into the new array, and return the new array.
// function printNewerCars(cars) {
//   const newCars = [];
//   for (let car of cars) {
//     if (car.year > 2012) {
//       newCars.push(car);
//     }
//   }
//   return newCars;
// }

// console.log(printNewerCars(cars));

// // Warmup 3: Loop through the array and find the first object with a
// // model property of "Sierra" and return it
// function findTheSierra(cars) {
//   for (let car of cars) {
//     if (car.model === "Sierra") {
//       return car;
//     }
//   }
// }

// console.log(findTheSierra(cars));

// Let's write a higher order function that simply does **something** for each item in an array
// This is a higher order function, because it accepts an argument and calls it as a function
// function doSomethingForEachThing(array, thingToDo) {
//   for (let element of array) {
//     thingToDo(element);
//   }
// }

// function printMoreCarInfo(car) {
//   console.log(
//     `Make: ${car.make}
//     Model: ${car.model}
//     Year: ${car.year}
//     Doors: ${car.numDoors}`
//   );
// }

// printMoreCarInfo is being used as a callback function
// doSomethingForEachThing(cars, printMoreCarInfo);

// I want to write a higher order function, and pass it a callback that will print both the index **and**
// the value of each element

function newForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

// Option 1: Define the function inline as an anonymous callback function
// newForEach(["a", "b", "c"], function (element, index) {
//   console.log(`${index} - ${element}`);
// });

// Option 2: Define the function inline as an anonymous arrow callback function

// newForEach(cars, (bananaPudding, toeCream) =>
//   console.log(`${toeCream} - ${bananaPudding.make}`)
// );

// const forEachResults = cars.forEach((e, i, a) =>
//   console.log(`${i} - ${e.make}`)
// );

// Traditional function
// function functionName(param1, param2) {
//   return "something";
// }

// const functionName = function (param1, param2) {
//   return "something";
// };

// Arrow function that accepts 2 values and returns the sum of them
// const addValues = (num1, num2) => num1 + num2;

// console.log(addValues(5, 9));

// Array.map()
// Array.map() is just like Array.forEach(), but with one major difference: it returns a new array with the result
// of each iteration's callback

// const mapResults = cars.map((e, i, a) => console.log(`${i} - ${e.make}`));

function newMap(array, callback) {
  const returnArray = [];
  for (let i = 0; i < array.length; i++) {
    const callbackResult = callback(array[i], i, array);
    returnArray.push(callbackResult);
  }
  return returnArray;
}

// Example: I just want an array of the year each car was manufactured
// function returnYear(car) {
//   return car.year;
// }
// Version 1: Use the newly defined recreation of Array.map()
const arrayOfJustYears = newMap(cars, (car) => car.year);
console.log(arrayOfJustYears);

// Version 2: Use the actual Array.map() to show and verify that it's working the same way
const arrayOfJustYearsMap = cars.map((car) => car.year);
// console.log(arrayOfJustYearsMap);

const arrayOfNumbers = [1, 2, 3, 4, 5];

// Array.reduce() is the most unique of these higher order functions. It is more of an aggregation function
// that progresses through the array, and uses the overal result up to any given point.

// Example 1: Calculate the sum of all numbers in an array:

const sum = arrayOfNumbers.reduce((prev, curr, i, arr) => prev + curr);

// Iteration 1:
// prev: 1
// curr: 2
// i: 1
// Callback returns: 3

// Iteration 2:
// prev: 3
// curr: 3
// i: 2
// Callback returns: 6

// Iteration 3:
// prev: 6
// curr: 4
// i: 3
// Callback returns: 10

// Iteration 4:
// prev: 10
// curr: 5
// i: 4
// Callback returns: 15

// Final result of arrayOfNums.reduce(): 15

// Example 2: calculate the sum of the years of each car

// If you provide an `initialValue` as the 2nd argument of Array.reduce(), that value
// will be prev in the first iteration:
const sumOfCarYears = cars.reduce((prev, curr) => prev + curr.year, 0);
console.log(sumOfCarYears);

// Iteration 1:
// prev: 0
// curr: cars[0]
// i: 0
// Callback returns: 2011

// Iteration 2:
// prev: 2011
// curr: cars[1]
// i: 1
// Callback returns: 4030

// Example 3: Use Array.reduce() to convert the array of objects to an HTML string to add to the webpage

// Each list item should look something like:
//  <li>
//    <p>Make: Ford</p>
//    <p>Model: Fiesta</p>
//    <p>Year: 2011 | Doors: 4</p>
//  </li>

const html = cars.reduce((prev, curr) => {
  return (
    prev +
    `<li>
    <p>Make: ${curr.make}</p>
    <p>Model: ${curr.model}</p>
    <p>Year: ${curr.year} | Doors: ${curr.numDoors}</p>
    </li>`
  );
}, "");

const carList = document.getElementById("carList");
carList.innerHTML = html;
