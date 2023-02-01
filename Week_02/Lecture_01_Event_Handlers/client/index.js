let firstNameValue = "";
let lastNameValue = "";

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");

firstNameInput.addEventListener("keyup", (e) =>
  console.log("firstname has been changed")
);

function handleChange() {
  alert("something");
}
