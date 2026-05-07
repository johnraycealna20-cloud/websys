const output = document.getElementById("productList");
const cartElement = document.getElementById("cart");
const cartTotal = document.getElementById("cartTotal");
const cartBadge = document.getElementById("cartBadge");
const clearCartBtn = document.getElementById("clearCart");
const cart = [];
const cartItems = new Set();

function renderCart() {
  cartElement.innerHTML = "";
  if (cart.length === 0) {
    cartElement.innerHTML = "<p>Cart is empty</p>";
    cartTotal.textContent = "0";
    cartBadge.textContent = "";
    return;
  }

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  cartTotal.textContent = total;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = `(${totalItems})`;

  cart.forEach((item, index) => {
    const subtotal = Number(item.price) * item.quantity;
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p>${item.name} - ${item.brand} (${item.model})</p>
      <p>Price: ${item.price} ${item.currency} | Qty: 
        <button class="decrease" data-name="${item.name}">-</button>
        <span>${item.quantity}</span>
        <button class="increase" data-name="${item.name}">+</button>
      </p>
      <p>Subtotal: ${subtotal} ${item.currency}</p>
      <button class="remove" data-name="${item.name}">Remove</button>
    `;
    cartElement.appendChild(itemDiv);
  });

 
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const name = e.target.dataset.name;
      const item = cart.find(i => i.name === name);
      item.quantity++;
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const name = e.target.dataset.name;
      const item = cart.find(i => i.name === name);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(cart.indexOf(item), 1);
        cartItems.delete(name);
      }
      renderCart();
      renderProducts();
    });
  });

  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const name = e.target.dataset.name;
      cart.splice(cart.findIndex(i => i.name === name), 1);
      cartItems.delete(name);
      renderCart();
      renderProducts();
    });
  });
}

function addToCart(item, name) {
  if (cartItems.has(name)) {
    const existing = cart.find(i => i.name === name);
    existing.quantity++;
  } else {
    cart.push({ ...item, name, quantity: 1 });
    cartItems.add(name);
  }
  renderCart();
  renderProducts();
}

function renderProducts() {
  output.innerHTML = "";
  for (const key in products) {
    const item = products[key];
    const div = document.createElement("div");
    div.style.backgroundImage = `url(${item.image})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    const buttonText = cartItems.has(key) ? "already in cart" : "Add to cart";
    const disabled = cartItems.has(key) ? "disabled" : "";
    div.innerHTML = `
      <h2>${key}</h2>
      <p>Brand: ${item.brand}</p>
      <p>Model: ${item.model}</p>
      <p>Price: ${item.price} ${item.currency}</p>
      <button ${disabled}>${buttonText}</button>
    `;
    div.querySelector("button").addEventListener("click", () => addToCart(item, key));
    output.appendChild(div);
  }
}

clearCartBtn.addEventListener("click", () => {
  cart.length = 0;
  cartItems.clear();
  renderCart();
  renderProducts();
});

renderProducts();
renderCart();