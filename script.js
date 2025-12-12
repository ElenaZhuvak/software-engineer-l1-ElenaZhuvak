// Global state
let allProducts = [];
let filteredProducts = [];

// DOM elements - add references to your HTML elements here
const productsGrid = document.getElementById('products-grid');
const noResults = document.getElementById('no-results');

// TODO: Add references to filter elements (search input, category dropdown, sort dropdown)

// Initialize app
async function init() {
    await loadProducts();
    setupEventListeners();
    renderProducts(allProducts);
}

// Load products from data.json
async function loadProducts() {
    try {
        // TODO: Fetch data from data.json
        // TODO: Store in allProducts variable
        // TODO: Handle errors
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
    // TODO: Clear the grid
    // TODO: If no products, show "no results" message
    // TODO: Otherwise, create product cards and append to grid
    // TODO: Each card should have:
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
