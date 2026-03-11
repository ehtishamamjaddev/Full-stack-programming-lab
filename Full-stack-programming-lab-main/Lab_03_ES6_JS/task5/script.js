/* Task 5 — Product Catalog (Map) */

const productMap = new Map();

productMap.set('P001', { id: 'P001', name: 'Wireless Earbuds Pro', category: 'Audio', price: 39.99, stock: 120 });
productMap.set('P002', { id: 'P002', name: 'Fitness Smartwatch', category: 'Wearables', price: 199.99, stock: 45 });
productMap.set('P003', { id: 'P003', name: 'Power Bank 20K', category: 'Accessories', price: 24.99, stock: 200 });
productMap.set('P004', { id: 'P004', name: 'Bluetooth Speaker X', category: 'Audio', price: 79.99, stock: 68 });
productMap.set('P005', { id: 'P005', name: 'Adjustable Laptop Stand', category: 'Accessories', price: 54.99, stock: 90 });

const productGrid = document.getElementById('product-grid');
const productCountEl = document.getElementById('productCount');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.getElementById('search-result');
const toggleAddForm = document.getElementById('toggleAddForm');
const addFormBody = document.getElementById('addFormBody');
const addProductBtn = document.getElementById('addProductBtn');

const renderProducts = (map) => {
  productGrid.innerHTML = '';
  productCountEl.textContent = map.size;

  map.forEach((product) => {
    productGrid.innerHTML += `
      <div class="prod-card">
        <span class="pid">${product.id}</span>
        <h3>${product.name}</h3>
        <span class="cat-badge">${product.category}</span>
        <div class="meta">
          <span class="price">$${product.price.toFixed(2)}</span>
          <span class="stock">Stock: ${product.stock}</span>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')" style="margin-top:6px;">Delete</button>
      </div>
    `;
  });
};

const searchProduct = (id) => {
  const trimmed = id.trim().toUpperCase();
  if (!trimmed) { searchResult.innerHTML = ''; return; }

  const product = productMap.get(trimmed);
  if (product) {
    searchResult.innerHTML = `
      <div class="search-found">
        <strong>${product.name}</strong> (${product.id})<br/>
        Category: <span class="chip">${product.category}</span>
        Price: <strong style="color:var(--success)">$${product.price.toFixed(2)}</strong>
        Stock: ${product.stock}
      </div>
    `;
  } else {
    searchResult.innerHTML = `<div class="search-not-found">Product not found for ID "${trimmed}"</div>`;
  }
};

const deleteProduct = (id) => {
  productMap.delete(id);
  renderProducts(productMap);
  searchResult.innerHTML = '';
};

const addProduct = (id, name, category, price, stock) => {
  productMap.set(id, { id, name, category, price, stock });
  renderProducts(productMap);
};

searchBtn.addEventListener('click', () => searchProduct(searchInput.value));
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchProduct(searchInput.value); });

toggleAddForm.addEventListener('click', () => {
  addFormBody.classList.toggle('hidden');
  toggleAddForm.textContent = addFormBody.classList.contains('hidden') ? '+ Add New Product' : '− Close Form';
});

addProductBtn.addEventListener('click', () => {
  const id = document.getElementById('newId').value.trim().toUpperCase();
  const name = document.getElementById('newName').value.trim();
  const category = document.getElementById('newCategory').value.trim();
  const price = parseFloat(document.getElementById('newPrice').value);
  const stock = parseInt(document.getElementById('newStock').value, 10);

  if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
    alert('Please fill in all fields correctly.');
    return;
  }

  addProduct(id, name, category, price, stock);
  document.getElementById('newId').value = '';
  document.getElementById('newName').value = '';
  document.getElementById('newCategory').value = '';
  document.getElementById('newPrice').value = '';
  document.getElementById('newStock').value = '';
});

renderProducts(productMap);
