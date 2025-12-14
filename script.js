// Global state
let allProducts = [];
let filteredProducts = [];

// DOM elements - add references to your HTML elements here
const productsGrid = document.getElementById('products-grid');
const noResults = document.getElementById('no-results');

// TODO: Add references to filter elements (search input, category dropdown, sort dropdown)
const searchInput = document.getElementById('search-filter');
const categorySelect = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-filter');


// Initialize app
async function init() {
    await loadProducts();
    setupEventListeners();
    renderProducts(allProducts);
}

// Load products from data.json
async function loadProducts() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`)
        }

        const data = await response.json();
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid data format: "products" array missing');
        }
        allProducts = data.products;
        console.log('Products loaded:', allProducts);

    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // TODO: Add event listeners for:
    // - Search input (with debounce)
    // - Category filter change
    // - Sort dropdown change
}

// Debounce helper function
function debounce(func, wait) {
    // TODO: Implement debounce
    // Should delay function execution until after 'wait' milliseconds have passed
}

// Filter and sort products
function applyFilters() {
    // TODO: Implement filtering logic
    // 1. Start with all products
    // 2. Apply search filter (if search term exists)
    // 3. Apply category filter (if not "All")
    // 4. Apply sorting
    // 5. Update filteredProducts
    // 6. Call renderProducts()
}

// Render products to the grid
function renderProducts(products) {
    productsGrid.innerHTML = '';

    if (!products || products.length === 0) {
        noResults.hidden = false;
        return;
    }

    const markup = products.map(product => {
        return `
        <li class='product-card' role='listitem'>
        <img src='${product.image}'
        alt='${product.name}'
        class='product-img' />

        <h3 class='product-name'>${product.name}</h3>

        <p class='product-category'>${product.category}</p>

        <p class='product-price'>${product.price}</p>

        <span class='product-rating'>${product.rating}</span>

        <p class='product-stock'>${product.stock}</p>
        </li>`;     
    }).join('');

    productsGrid.innerHTML = markup;

    //   - Image with alt text
    //   - Name
    //   - Category badge
    //   - Price (formatted as currency)
    //   - Rating (star display)
    //   - Stock status
}

// Helper: Format price as currency
function formatPrice(price) {
    // TODO: Format as USD currency (e.g., $1,299.00)
}

// Helper: Create star rating display
function createStarRating(rating) {
    // TODO: Create visual star rating (e.g., ★★★★☆ for 4.0)
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
