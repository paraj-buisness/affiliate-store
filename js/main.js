// Load products.json (works from index, niches, or product pages)
async function fetchProducts() {
  let path = "products.json";
  if (window.location.pathname.includes("niches/")) {
    path = "../products.json";
  }
  const response = await fetch(path);
  if (!response.ok) {
    console.error("Error loading products.json:", response.status);
    return [];
  }
  return await response.json();
}

// Show products for a category
async function loadProducts(category) {
  const products = await fetchProducts();
  console.log("Loaded products:", products); // debug

  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.filter(p => p.category === category).forEach(product => {
    const card = `
      <div class="card">
        <img src="${product.image}" alt="${product.title}" width="150">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a href="../product.html?id=${product.id}">View Details</a>
      </div>
    `;
    list.innerHTML += card;
  });

  if (list.innerHTML === "") {
    list.innerHTML = "<p>No products found in this category.</p>";
  }
}

// Show single product details
async function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const products = await fetchProducts();
  const product = products.find(p => p.id === id);

  const container = document.getElementById("product-details");
  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <h1>${product.title}</h1>
    <img src="${product.image}" alt="${product.title}" width="250">
    <p>${product.description}</p>
    <div>
      ${product.amazon ? `<a href="${product.amazon}" target="_blank">Buy on Amazon</a>` : ""}
    </div>
  `;
}
