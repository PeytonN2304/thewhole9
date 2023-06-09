function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

const addToCartButton = document.querySelectorAll("[data-addToCartButton]");
const cartQuantity = document.querySelector("[data-cartQuantity]")



addToCartButton.addEventListener('click', function() {
  // Get the current quantity value
  var currentQuantity = parseInt(quantityElement.getAttribute('value'));

  // Increment the quantity by 1
  var newQuantity = currentQuantity + 1;

  // Update the quantity element
  cartQuantity.innerHTML = newQuantity;
  cartQuantity.setAttribute('value', newQuantity.toString());
});



