import { products } from "./products.js";

const productContainer = document.getElementById("product-Container");
const searchInput = document.getElementById("search");
let carts = JSON.parse(localStorage.getItem("carts") || "[]");

const showproducts = (productData) => {
  let cards = "";
  productData.forEach((value) => {
    cards += `
            <div class="product-card">
                    <div class="product-image">
                        <img src="${value.image}" alt="${value.name}" style="object-fit:contain">
                        <div class="product-badge sale">Sale</div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${value.name}</h3>
                        <p class="product-description">${value.description}</p>
                        <div class="product-rating">
                            <div class="stars">
                                <span class="star filled">★</span>
                                <span class="star filled">★</span>
                                <span class="star filled">★</span>
                                <span class="star filled">★</span>
                                <span class="star">★</span>
                            </div>
                            <span>${value.rate}</span>
                        </div>
                        <div class="product-price">
                            <span class="current">$${value.price}</span>
                            <span class="original">$${value.price}</span>
                        </div>
                        <div class="product-actions">
                            <a href="productDetail.html?id=${value.id}" class="btn btn-outline">View</a>
                            <button class="btn btn-primary" onclick="AddToCart(${value.id})" aria-label="Add ${value.name} to cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
        `;
  });
  productContainer.innerHTML = cards;
};

showproducts(products);

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const productsAfterSearch = products.filter((pro) =>
    pro.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  showproducts(productsAfterSearch);
});

window.AddToCart = (id) => {
  const product = products.find((value) => value.id == id);
  const checkifAlreadyExist = carts.find((value) => value.id == id);
  if (checkifAlreadyExist == undefined) {
    carts.push({ ...product, quantity: 1 });
    localStorage.setItem("carts", JSON.stringify(carts));
  } else {
    const cartAfterUpdateQTY = carts.map((value) =>
      value.id == id ? { ...value, quantity: value.quantity + 1 } : value
    );
    carts = cartAfterUpdateQTY;
    localStorage.setItem("carts",JSON.stringify(carts))

  }
};
