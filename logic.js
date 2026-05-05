const output = document.getElementById("productList");
const cartElement = document.getElementById("cart");
const cartTotal = document.getElementById("cartTotal");
const cart = [];

function renderCart() {
  cartElement.innerHTML = "";
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  cartTotal.textContent = total;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p>${item.name} - ${item.brand} (${item.model}) - ${item.price} ${item.currency}</p>
      <button data-index="${index}">Remove</button>
    `;
    itemDiv.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });
    cartElement.appendChild(itemDiv);
  });
}

function addToCart(item, name) {
  cart.push({ ...item, name });
  renderCart();
}

for (const key in products) {
  const item = products[key];
  const div = document.createElement("div");
  div.innerHTML = `
    <h2>${key}</h2>
    <p>Brand: ${item.brand}</p>
    <p>Model: ${item.model}</p>
    <p>Price: ${item.price} ${item.currency}</p>
    <button>Add to cart</button>
  `;
  div.querySelector("button").addEventListener("click", () => addToCart(item, key));
  output.appendChild(div);
}