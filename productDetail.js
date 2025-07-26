import { products } from "./products.js";

const imagePreview = document.getElementById("image-preview");
const productId = document.querySelector(".product-id");
const productCategory = document.querySelector(".product-category");
const productTitle = document.querySelector(".product-title");
const rateValue = document.querySelector(".rating-value");
const currentPrice = document.querySelector(".current-price");
const productDescription = document.querySelector(".product-description");

const urlParams = new URLSearchParams(new URL(window.location.href).search);
let id = urlParams.get("id");
id = parseInt(id, 10);

const productToShow = products.find((value) => value.id == id);
imagePreview.src = productToShow.image;
productId.textContent = `#0${productToShow.id}`;
productCategory.textContent = productToShow.category;
productTitle.textContent = productToShow.name;
rateValue.textContent = productToShow.rate;
currentPrice.textContent = productToShow.price;
productDescription.textContent = productToShow.description;

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const quantity = document.getElementById("quantity");
const addtocarts = document.querySelector(".add-to-cart");
let count = 1;
quantity.value = count;

plus.addEventListener("click", () => {
  count++;
  quantity.value = count;
});
minus.addEventListener("click", () => {
  count--;
  if (count < 1) {
    count = 1;
  }
  quantity.value = count;
});
let carts = JSON.parse(localStorage.getItem("carts") || "[]");
const AddToCart = (id, qty) => {
  const product = products.find((value) => value.id == id);
  const checkifAlreadyExist = carts.find((value) => value.id == id);
  if (checkifAlreadyExist == undefined) {
    carts.push({ ...product, quantity: qty });
    alert("ggggh");
    localStorage.setItem("carts", JSON.stringify(carts));
  } else {
    const cartAfterUpdateQTY = carts.map((value) =>
      value.id == id ? { ...value, quantity: value.quantity + qty } : value
    );
    carts = cartAfterUpdateQTY;
    localStorage.setItem("carts", JSON.stringify(carts));
  }
};
addtocarts.addEventListener("click", () => {
  AddToCart(id, count);
});
