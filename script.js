// Global state
let allProducts = [];
let filteredProducts = [];

// DOM elements - add references to your HTML elements here
const clearSearchBtn = document.getElementById("clear-search");
const countResults = document.getElementById("count-filter-results");
const productsGrid = document.getElementById("products-grid");
const noResults = document.getElementById("no-results");
console.log("noResults:", noResults);


// TODO: Add references to filter elements (search input, category dropdown, sort dropdown)
const searchInput = document.getElementById("search-filter");
const categorySelect = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-filter");
// const checkBoxEl = document.getElementById("inStock-filter");
const maxPriceEl = document.getElementById('maxPrice');


// Initialize app
async function init() {
    await loadProducts();
    setupEventListeners();
    renderProducts(allProducts);
}

// Load products from data.json
async function loadProducts() {
    try {
        const response = await fetch("./data.json");
        console.log("response after fetch", response);
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid data format: "products" array missing');
        }
        allProducts = data.products;
        console.log("Products loaded:", allProducts);

        filteredProducts = [...allProducts];
    } catch (error) {
        console.error("Error loading products:", error);
    }
    resultsCount();
}

// Setup event listeners
const state = {
    searchQuery: "",
    category: "all",
    sortBy: "featured",
    // stock: false,
    // maxPrice: false,
};

function setupEventListeners() {
    searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        displayClearBtn();
        debouncedFilter();
    });
    categorySelect.addEventListener("change", (e) => {
        state.category = e.target.value;
        applyFilters();
    });
    sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        applyFilters();
    });
   /* checkBoxEl.addEventListener('change', (e) => {
        state.stock = e.target.checked;
        applyFilters(); 
    })*/

        // maxPriceEl.addEventListener('change', (e) => {
        //     state.maxPrice = e.target.checked;
        //     applyFilters();
        // })

}

// Setup products counting
function resultsCount() {
    const count = allProducts.length;
    countResults.textContent = `Showing ${count} products`;
}

function updateResultsCount() {
    const count = filteredProducts.length;
    countResults.textContent = `Showing ${count} products`;
}

// Debounce helper function
function debounce(fn, wait) {
    let timeoutId
    return function(...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

const debouncedFilter = debounce(applyFilters, 300);

// Filter and sort products
function applyFilters() {
    let results = [...allProducts];

    const query = state.searchQuery.trim().toLowerCase(); /* add method trim() to avoid incorrect rendering */
    if (query !== "") {
        results = results.filter((product) =>
            product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    }

    if (state.category !== "All") {
        results = results.filter(
            (product) => product.category === state.category
        );
    }

    // if (state.stock) {
    //     results = results.filter((product) => product.stock === "In Stock");
    // }

    // if (state.maxPrice) {
    //     results = results.filter((product) => product.price <= 1000);
    // }

    if (state.sortBy === "low-to-high") {
        results.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "high-to-low") {
        results.sort((a, b) => b.price - a.price);
    }
    
    filteredProducts = results;
    renderProducts(filteredProducts);
    updateResultsCount();
}

// Setup clear button
function displayClearBtn() {
    clearSearchBtn.style.display = searchInput.value.trim() ? "block" : "none";
}

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";

    categorySelect.value = "All"; //add clear category
    state.category = "All";

    sortSelect.value = "featured"; // add clear sort by price
    state.sortBy = "Featured";

    displayClearBtn();
    applyFilters();
});

// Render products to the grid
function renderProducts(products) {
    productsGrid.innerHTML = "";

    if (!products || products.length === 0) {
        noResults.hidden = false;
        return;
    }

    const markup = products
        .map((product) => {
            return `
        <li class='product-card' role='listitem'>
        <img src='${product.image}'
        alt='${product.name}'
        class='product-img' />

        <h3 class='product-name'>${product.name}</h3>

        <p class='product-category'>${product.category}</p>

        <p class='product-price'>${formatPrice(product.price)}</p>

        <span class='product-rating'>${createStarRating(product.rating)}</span>

        <p class='product-stock'>${getStockStatus(product.stock)}</p>
        </li>`;
        })
        .join("");

    productsGrid.innerHTML = markup;

    noResults.hidden = true;  /* no need as the condition works */
}

// Helper: Format price as currency
function formatPrice(price) {
    // TODO: Format as USD currency (e.g., $1,299.00)
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

// Helper: Create star rating display
function createStarRating(rating) {
    const rounded = Math.round(rating);
    let stars = '';

    for (let i = 1; i <= 5; i ++) {
        if (i <= rounded) { 
            stars += `<span class='full-star'>★</span>`
        } else {
            stars += `<span class='empty-star'>☆</span>`
        }
    }
    return stars;
}

// Helper: Create stock status in colors
function getStockStatus(stock) {
    if (stock === 'In Stock') {
        return `<p class='stock-in'>In Stock</p>`
    }
    if (stock === 'Low Stock') {
        return `<p class='stock-low'>Low Stock</p>`
    }
    return `<p class='stock-out'>Out of Stock</p>`
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
