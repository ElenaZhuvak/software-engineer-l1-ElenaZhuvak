// Global state
let allProducts = [];
let filteredProducts = [];

// DOM elements - add references to your HTML elements here
const clearSearchBtn = document.getElementById("clear-search");
const countResults = document.getElementById("count-filter-results");
const productsGrid = document.getElementById("products-grid");
const noResults = document.getElementById("no-results");

// TODO: Add references to filter elements (search input, category dropdown, sort dropdown)
const searchInput = document.getElementById("search-filter");
const categorySelect = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-filter");

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
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const data = await response.json();
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
    category: "All",
    sortBy: "featured",
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
}

// Setup products counting
function resultsCount() {
    const count = allProducts.length;
    console.log("Total products loaded:", count);

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

    if (state.searchQuery !== "") {
        const query = state.searchQuery.toLowerCase();
        results = results.filter((product) =>
            product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    }
    if (state.category !== "All") {
        results = results.filter(
            (product) => product.category === state.category
        );
    }
    if (state.sortBy === "price-asc") {
        results.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
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

        <p class='product-stock'>${product.stock}</p>
        </li>`;
        })
        .join("");

    productsGrid.innerHTML = markup;
    noResults.hidden = true;
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
    // TODO: Create visual star rating (e.g., ★★★★☆ for 4.0)
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
