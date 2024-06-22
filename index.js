function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

let lineItemContainer = document.getElementById("lineItemContainer");
let currentProductList = new Array();
let package = null;
let packageID = null;
let totalAmount = 0;
let lineItemCount = 0;

document.getElementById("packageNames").addEventListener("change", function () {
  var selectedValue = this.value;
  var selectedPackage = JSON.parse(selectedValue);
  currentProduct = selectedPackage;
  addToPrice(currentProduct);
});

document.getElementById("addOnNames").addEventListener("change", function () {
  var selectedValue = this.value;
  var selectedPackage = JSON.parse(selectedValue);
  currentProduct = selectedPackage;
  addToPrice(currentProduct);
});

function removelineitem(product, lineItemId) {
  if (product == null) {
    console.log("Product is null");
    return;
  }

  console.log(product);

  for (let i = 0; i < currentProductList.length; i++) {
    let dict = currentProductList[i];
    if (Object.keys(dict)[0] == Object.keys(product)[0]) {
      currentProductList.splice(i, 1);
      break;
    }
  }

  let lineItem = document.getElementById(lineItemId); // Get the line item by its ID
  if (lineItem) {
    console.log(product[Object.keys(product)[0]]);
    totalAmount -= product[Object.keys(product)[0]];
    let totalDiv = document.getElementById("totalAmount");
    totalDiv.innerHTML = "$" + totalAmount;
    lineItem.remove(); // Remove the corresponding line item from DOM
  }
}

function addToPrice(product) {
  let productName = Object.keys(product)[0]; // Assuming product is an object with a single key
  let productPrice = product[productName];

  for (let product of currentProductList) {
    for (let key in product) {
      if (key === productName) {
        return;
      }
    }
  }

  if (
    package != null &&
    (productName == "Exterior package" ||
      productName == "Interior package" ||
      productName == "Whole 9 package")
  ) {
    removelineitem(package, packageID);
    package = null;
    packageID = null;
  }

  // Get the price from the product object

  if (productName == "None") {
    removelineitem(package, packageID);
    package = null;
    packageID = null;
    return;
  }

  if (
    productName == "Exterior package" ||
    productName == "Interior package" ||
    productName == "Whole 9 package"
  ) {
    package = product;
  }

  currentProductList.push(product);
  totalAmount += productPrice; // Update total amount

  let productString = JSON.stringify(product)
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;");
  let lineItemId = `line${lineItemCount}Number`;
  if (
    productName == "Exterior package" ||
    productName == "Interior package" ||
    productName == "Whole 9 package"
  ) {
    packageID = lineItemId;
  }
  lineItemContainer.innerHTML += `
    <div class='lineItem' id='${lineItemId}'>
      <h4 class='ProductName'>${productName}</h4>
      <h4 class='ProductPrice' id='AmountPrice'>$${productPrice}</h4>
      <button class='btnSmallerCart' onclick="removelineitem(${productString}, '${lineItemId}')">X</button>
    </div>
  `;
  lineItemCount++;
  let totalDiv = document.getElementById("totalAmount");
  totalDiv.innerHTML = "$" + totalAmount;
}
