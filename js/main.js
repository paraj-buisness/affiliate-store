// Load products.json
async function fetchProducts() {
  const response = await fetch("/products.json");
  return await response.json();
}

// Show products for a category
async function loadProducts(category) {
  const products = await fetchProducts();
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.filter(p => p.category === category).forEach(product => {
    const card = `
      <div class="card">
        <img src="${product.image}" alt="${product.title}" width="150">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a href="/product.html?id=${product.id}">View Details</a>
      </div>
    `;
    list.innerHTML += card;
  });
}

// Show single product details
async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const products = await fetchProducts();
  const product = products.find(p => p.id === id);

  if (product) {
    document.getElementById("product-details").innerHTML = `
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="${product.title}" width="250">
      <p>${product.description}</p>
      <div>
        ${product.amazon ? `<a href="${product.amazon}" target="_blank">Buy on Amazon</a>` : ""}
        ${product.flipkart ? `<a href="${product.flipkart}" target="_blank">Buy on Flipkart</a>` : ""}
      </div>
    `;
  } else {
    document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
  }
}
