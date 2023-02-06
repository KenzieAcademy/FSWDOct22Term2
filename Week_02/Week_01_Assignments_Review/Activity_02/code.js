let products = [
  {
    id: "15215",
    name: "25' Garden Hose",
    price: 9.5,
    quantity: 1,
    department: "garden",
  },
  {
    id: "15123",
    name: "Bag of Garden Soil",
    price: 5.0,
    quantity: 1,
    department: "garden",
  },
  {
    id: "15312",
    name: "Shovel",
    price: 12.0,
    quantity: 1,
    department: "garden",
  },
  {
    id: "15215",
    name: "Screwdriver",
    price: 4.5,
    quantity: 0,
    department: "tool",
  },
  {
    id: "15215",
    name: "Corded Drill",
    price: 124.5,
    quantity: 1,
    department: "tool",
  },
  {
    id: "15215",
    name: "Pack of 50 Screws",
    price: 8.5,
    quantity: 2,
    department: "hardware",
  },
  {
    id: "15215",
    name: '1/8" washers',
    price: 4.5,
    quantity: 1,
    department: "hardware",
  },
];

let chosenDepartment = "";

function renderProducts() {
  // let html = products
  //   .filter((product) => product.quantity > 0)
  //   .filter((product) => product.department.includes(chosenDepartment))
  //   .map(
  //     (product) =>
  //       `<li><h3>${product.name}</h3><span>Price: $${product.price.toFixed(
  //         2
  //       )}</span></li>`
  //   )
  //   .reduce((HTMLSoFar, currentProductHTML) => HTMLSoFar + currentProductHTML);

  let html = products.reduce((html, product) => {
    if (
      product.quantity === 0 ||
      !product.department.includes(chosenDepartment)
    )
      return html;

    return (
      html +
      `<li><h3>${product.name}</h3><span>Price: $${product.price.toFixed(2)}`
    );
  }, "");

  // Your Code Here.

  let elem = document.getElementById("productList");
  elem.innerHTML = html;
}

window.onload = () => {
  renderProducts(products);
  document.getElementById("showAll").onclick = function () {
    chosenDepartment = "";
    renderProducts();
  };
  document.getElementById("showHardware").onclick = function () {
    chosenDepartment = "hardware";
    renderProducts();
  };
  document.getElementById("showGarden").onclick = function () {
    chosenDepartment = "garden";
    renderProducts();
  };
  document.getElementById("showTools").onclick = function () {
    chosenDepartment = "tool";
    renderProducts();
  };
};
