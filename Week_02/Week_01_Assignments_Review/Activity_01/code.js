// NOTE: A "users" array is already loaded.
// See the "./data/users.js" script tag in index.html.

// The following line is here just to show you that the
// "users" array has already been loaded and is ready to go.
console.log(users);

// Append the katas to this element:
const main = document.querySelector("main");

const printKata = function (kataNumber, object) {
  // For the usage of the DETAILS and SUMMARY tags
  // in HTML, see: http://mdn.io/details-element
  const detailsElement = document.createElement("details");
  main.append(detailsElement);
  //
  const summaryElement = document.createElement("summary");
  summaryElement.append("KATA " + kataNumber);
  detailsElement.append(summaryElement);
  //
  // http://mdn.io/json.stringify
  const stringifiedObject = JSON.stringify(object);
  detailsElement.append(stringifiedObject);
};

// Kata 0: Practice
const greenEyes1 = users.filter((user) => user.eyeColor === "green");
// OR...
const greenEyes2 = users.filter(function (user) {
  return user.eyeColor === "green";
});
printKata(0, greenEyes1); // If you don't have this function already, see the "Set up" section above.

// Kata 1: Active Users
const activeUsers = users.filter((user) => user.isActive);
printKata(1, activeUsers);

// Kata 2: Map User Email Address
const userEmails = users.map((user) => user.email);
printKata(2, userEmails);

// Kata 3: Some User at Ovation
const doesSomeoneWorkForOvation = users.some(
  (user) => user.company === "OVATION"
);
printKata(3, doesSomeoneWorkForOvation);

// Kata 4: First User Over 28 YO
const firstUserOver28 = users.find((user) => user.age > 28);
printKata(4, firstUserOver28);

// Kata 5: Filter and Find First Active User Over 28
const firstActiveOver28 = users
  .filter((user) => user.isActive)
  .find((user) => user.age > 28);
printKata(5, firstActiveOver28);

// Kata 6: Filter and Map ZENCO balances
const zencoBalances = users
  .filter((user) => user.company === "ZENCO")
  .map((user) => user.balance);
printKata(6, zencoBalances);

// Kata 7: Filter, Includes, and Map Fugiat tag users
const fugiatUsers = users
  .filter((user) => user.tags.includes("fugiat"))
  .map((user) => user.age);
printKata(7, fugiatUsers);

// Kata 8: Calculate total sum of user balances with reduce
const balanceSum = users.reduce((sum, currUser) => {
  let balance = Number(currUser.balance.split(/[$,]/).join(""));
  return sum + balance;
}, 0);
printKata(8, "Total Balance: " + balanceSum);

// PART TWO

// Kata 9: Display Every User with Brown Eyes
const h2 = document.createElement("h2");
h2.innerText = "Users with Brown Eyes";
main.appendChild(h2);

const ul = document.createElement("ul");
main.appendChild(ul);

users.forEach((user) => {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  nameSpan.innerText = user.name;

  const img = document.createElement("img");
  img.src = user.picture;
  img.alt = user.name;

  li.append(nameSpan, img);
  main.append(li);
});
