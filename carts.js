const cartIteam = document.getElementById("cart-item");
let carts = JSON.parse(localStorage.getItem("carts"));
const checkOut = document.getElementById("checkout");

const showCartItems = (arreyIteam) => {
  cartslist = "";
  arreyIteam.forEach((value) => {
    cartslist += `
        <div class="cart-item" id="cart-item">
            <div class="item-image">
                <img src="${value.image}" alt="Premium Wireless Headphones">
            </div>
            <div class="item-details">
                <h3>${value.name}</h3>
                <p class="item-description">${value.description}</p>
                <div class="item-specs">
                    <span>Color: Black</span>
                    <span>Size: Standard</span>
                </div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn minus" type="button" onclick="decreaseQty(${value.id})">−</button>
                <span class="qty-display">${value.quantity}</span>
                <button class="qty-btn plus" type="button" onclick="increaseQty(${value.id})">+</button>
            </div>
            <div class="item-price">
                <span class="current-price">$${value.price}</span>
                <span class="original-price">$339.99</span>
            </div>
            <button class="remove-btn" type="button" onclick="removeCartItem(${value.id})">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
            
        </div>
                     
                        
    `;
  });
  cartIteam.innerHTML = cartslist;
};
showCartItems(carts);
const checkoutSection = document.getElementById("checkout-section");
const showcheckOut = (checkcarts) => {
  check = "";
  checkcarts.forEach((value) => {
    check = `
        <div class="checkout-section">
                    <div class="checkout-card">
                        <h3>Order Summary</h3>
                        
                        <div class="summary-row" >
                            <span>Subtotal (4 items)</span>
                            <span id="Subtotal">$1,699.96</span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Shipping</span>
                            <span class="free">Free</span>
                        </div>
                        
                        <div class="summary-row">
                            <span>Tax</span>
                            <span>$136.00</span>
                        </div>
                        
                        <div class="summary-row discount">
                            <span>Discount</span>
                            <span>-$200.00</span>
                        </div>
                        
                        <hr class="summary-divider">
                        
                        <div class="summary-row total">
                            <span>Total</span>
                            <span id="Total">$1,635.96</span>
                        </div>

                        <div class="promo-code">
                            <input type="text" placeholder="Enter promo code" class="promo-input">
                            <button type="button" class="promo-btn">Apply</button>
                        </div>
 
                        <button class="checkout-btn" id="checkout" onclick="checkout(${value.id})">Proceed to Checkout</button>
                        
                        <div class="payment-methods">
                            <p>We accept:</p>
                            <div class="payment-icons">
                                <span>💳</span>
                                <span>🏦</span>
                                <span>📱</span>
                                <span>💰</span>
                            </div>
                        </div>

                        <div class="security-info">
                            <p>🔒 Secure checkout with 256-bit SSL encryption</p>
                        </div>
                    </div>

                    <div class="checkout-features">
                        <div class="feature">
                            <span class="feature-icon">🚚</span>
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders over $50</p>
                            </div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">↩️</span>
                            <div>
                                <h4>Easy Returns</h4>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">💬</span>
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Customer service available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
  });
  checkoutSection.innerHTML = check;
};
showcheckOut(carts);

const increaseQty = (id) => {
  const cartAfterUpdateQTY = carts.map((value) =>
    value.id == id ? { ...value, quantity: value.quantity + 1 } : value
  );
  carts = cartAfterUpdateQTY;
  localStorage.setItem("carts", JSON.stringify(carts));
  showCartItems(carts);
  updateCartCount();
  calculateAll();
};
const Subtotal = document.getElementById("Subtotal");
const Total = document.getElementById("Total");
const calculateAll = () => {
  let TotalAll = 0;
 carts.forEach((value)=>{
     TotalAll += parseFloat(value.price) * value.quantity;
 })
  Subtotal.textContent = `${TotalAll.toFixed(2)}`;
  Total.textContent = `${TotalAll.toFixed(2)}`;
};
calculateAll();




const decreaseQty = (id) => {
  const cartAfterUpdateQTY = carts.map((value) =>
    value.id == id
      ? { ...value, quantity: value.quantity <= 1 ? 1 : value.quantity - 1 }
      : value
  );
  carts = cartAfterUpdateQTY;
  localStorage.setItem("carts", JSON.stringify(carts));
  showCartItems(carts);
  updateCartCount();
  calculateAll();
};
const removeCartItem = (id) => {
  const removeCartItem = carts.filter((value) => value.id !== id);
  carts = removeCartItem;
  localStorage.setItem("carts", JSON.stringify(carts));
  showCartItems(carts);
  updateCartCount();
  calculateAll();
};
const checkout = () => {
  const carts = [];
  localStorage.setItem("carts", JSON.stringify(carts));
  showCartItems(carts);
  updateCartCount();
  calculateAll();
};
const cartCount = document.getElementById("cart-count");
const updateCartCount = () => {
  let carts = JSON.parse(localStorage.getItem("carts"));
  const totalcarts = carts.reduce((sum, iteam) => (sum += iteam.quantity), 0);
  cartCount.innerText = totalcarts;
};
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  calculateAll();
});
