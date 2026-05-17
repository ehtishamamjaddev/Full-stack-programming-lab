/* Task 2 — Online Shopping Cart (Rest, Spread, Destructuring) */

const catalog = [
  { id: 1, name: 'Wireless Earbuds', price: 49.99, emoji: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99, emoji: '⌨️' },
  { id: 3, name: 'USB-C Hub', price: 34.99, emoji: '🔌' },
  { id: 4, name: 'Curved Monitor', price: 279.99, emoji: '🖥️' },
  { id: 5, name: 'Ergonomic Mouse', price: 45.99, emoji: '🖱️' }
];

let cart = [];

const addToCart = (...items) => {
  items.forEach(item => cart.push(item));
  renderCart();
};

const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  renderCart();
};

const renderCatalog = () => {
  const el = document.getElementById('catalog');
  el.innerHTML = catalog.map(p => `
    <div class="product-card">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)}</p>
      <button class="btn btn-sm" onclick="addToCart({id:${p.id},name:'${p.name}',price:${p.price},emoji:'${p.emoji}'})">Add to Cart</button>
    </div>
  `).join('');
};

const renderCart = () => {
  const countEl = document.getElementById('cart-count');
  const firstArea = document.getElementById('first-item-area');
  const remainingArea = document.getElementById('remaining-items');
  const cartItemsEl = document.getElementById('cart-items');

  countEl.textContent = cart.length;

  if (cart.length === 0) {
    firstArea.innerHTML = '';
    remainingArea.innerHTML = '';
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty — add some products above.</p>';
    return;
  }

  const cartSnapshot = [...cart];
  const [firstProduct, ...remainingProducts] = cartSnapshot;

  firstArea.innerHTML = `
    <div class="first-highlight">
      <span class="badge badge-accent">First Item</span>
      <h3>${firstProduct.emoji} ${firstProduct.name}</h3>
      <p style="color:var(--success);font-weight:700;">$${firstProduct.price.toFixed(2)}</p>
    </div>
  `;

  if (remainingProducts.length > 0) {
    remainingArea.innerHTML = `
      <p style="color:var(--text-muted);margin-bottom:8px;font-size:0.84rem;">Remaining items (${remainingProducts.length}):</p>
      <div class="remaining-list">
        ${remainingProducts.map(p => `<span class="chip">${p.emoji} ${p.name}</span>`).join('')}
      </div>
    `;
  } else {
    remainingArea.innerHTML = '';
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-card">
      <div class="info">
        <span class="emoji">${item.emoji}</span>
        <div>
          <strong>${item.name}</strong>
          <div style="color:var(--success);font-size:0.82rem;">$${item.price.toFixed(2)}</div>
        </div>
      </div>
      <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
};

renderCatalog();
renderCart();
