let packageindex = 0;
let addonindex = 0;
let lineItemContainer = document.getElementById("lineItemContainer");
let currentProductList = new Array();
let package = null;
let packageID = null;
let totalAmount = 0;
let lineItemCount = 0;
let slideIndex = 1;
let touchableElementPackage = document.getElementById("packagemobile");
let parentContainer = document.getElementById("packagemobile");
const originalBackground = parentContainer.style.background;
const newBackground = `linear-gradient(#f703ff, #9900ff) padding-box,
linear-gradient(to right, rgb(0, 255, 255), rgb(0, 255, 255)) border-box`;

touchableElementPackage.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  false
);

touchableElementPackage.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  },
  false
);

function handleGesture() {
  if (Math.abs(touchendX - touchstartX) < 20) {
    return;
  }
  if (touchendX < touchstartX) {
    nextpackage();
  }

  if (touchendX > touchstartX) {
    prevpackage();
  }
}

function nextpackage() {
  packageindex = (packageindex + 1) % 3;
  updatePackage(packageindex);
}
function prevpackage() {
  packageindex = (packageindex + 2) % 3;
  updatePackage(packageindex);
}

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function updatePackage(index) {
  console.log("Setting color");

  parentContainer.innerHTML = "";
  stringToAdd = "";
  if (index == 0) {
    parentContainer.style.background = originalBackground;
    stringToAdd = `
    <h1>Exterior</h1>
    <h2>$150</h2>
    <p class="description">
      Our <strong>exterior package</strong> uses fine autocare products
      that are sure to leave your vehicle with stunning shine
    </p>
    <div class="features">
      <div class="Featuretext">
        <p>
          <span>Features:</span>
          <li>Full car hand wash <br />(with foam bath)</li>
          <li>Shammy hand dry</li>
          <li>Tire cleaning</li>
          <li>Deep Wheel cleaning</li>
          <li>One layer cleaner wax</li>
          <li>
            Spotless glass cleaning <br />
            (interior & exterior)
          </li>
        </p>
      </div>
    </div>
    
    <img src="images/bucket.png" alt="Bucket" />
    <button
    onclick="addToPrice({'Exterior package': 150})"
    class="btnSmaller"
  >
    Add to cart
  </button>`;
  } else if (index == 1) {
    parentContainer.style.background = newBackground;
    stringToAdd = `
            <h1>Interior</h1>
            <h2>$125</h2>
            <p class="description">
              Our <b>interior package</b> is sure to leave the inside of YOUR
              car looking impeccable as a result of our faithful products
            </p>
            <div class="features">
              <div class="Featuretext">
                <p>
                  <span>Features:</span>
                  <li>Vacuum</li>
                  <li>
                    Surface cleaning <br />
                    (vents,vinyl, compartments, seats)
                  </li>
                  <li>Door jams</li>
                  <li>Odor control</li>
                  <li>
                    Floor Mats <br />
                    (rubber & cloth)
                  </li>
                  <li>
                    Spotless glass cleaning <br />
                    (interior & exterior)
                  </li>
                </p>
              </div>
            </div>
            <img src="images/vacuum.png" alt="vacuum" id="vacuum" />
            <button
            onclick="addToPrice({'Interior package': 125})"
            class="btnSmaller"
          >
            Add to cart
          </button>`;
  } else {
    parentContainer.style.background = originalBackground;
    stringToAdd = `
    <h1>"Whole 9"</h1>
    <h2>$215</h2>
    <p class="description">
      Our <b>whole 9 package</b> makes your car feel as fresh as new
      inside and out
    </p>
    <div class="features">
      <div class="Featuretext">
        <p>
          <span>Features:</span>
          <li>Exterior package</li>
          <li>Interior Package</li>
        </p>
      </div>
    </div>
    <img src="images/whole9.png" alt="Bucket" id="bigger" />
    <button
    onclick="addToPrice({'Whole 9 package': 215})"
    class="btnSmaller"
  >
    Add to cart
  </button>`;
  }
  parentContainer.innerHTML += stringToAdd;
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

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
