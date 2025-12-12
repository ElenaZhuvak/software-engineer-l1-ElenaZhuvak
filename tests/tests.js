// Test framework
const tests = [];
let testResults = [];

function test(name, fn, group = 'General') {
    tests.push({ name, fn, group });
}

async function runAllTests() {
    const resultsDiv = document.getElementById('test-results');
    const loadingDiv = document.getElementById('loading');
    const button = document.querySelector('.run-tests-btn');

    button.disabled = true;
    button.textContent = 'Running tests...';
    loadingDiv.textContent = 'Running tests...';
    resultsDiv.innerHTML = '';
    testResults = [];

    // Group tests
    const groupedTests = {};
    tests.forEach(t => {
        if (!groupedTests[t.group]) groupedTests[t.group] = [];
        groupedTests[t.group].push(t);
    });

    // Run tests
    for (const [group, groupTests] of Object.entries(groupedTests)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'test-group';
        groupDiv.innerHTML = `<h2>${group}</h2>`;

        for (const t of groupTests) {
            try {
                await t.fn();
                testResults.push({ name: t.name, passed: true });
                groupDiv.innerHTML += createTestHTML(t.name, true);
            } catch (error) {
                testResults.push({ name: t.name, passed: false, error: error.message });
                groupDiv.innerHTML += createTestHTML(t.name, false, error.message);
            }
        }

        resultsDiv.appendChild(groupDiv);
    }

    // Update summary
    const passed = testResults.filter(r => r.passed).length;
    const failed = testResults.filter(r => !r.passed).length;
    document.getElementById('passed-count').textContent = passed;
    document.getElementById('failed-count').textContent = failed;
    document.getElementById('total-count').textContent = tests.length;

    button.disabled = false;
    button.textContent = 'Run All Tests';
    loadingDiv.style.display = 'none';
}

function createTestHTML(name, passed, error = null) {
    const icon = passed ? '✓' : '✗';
    const status = passed ? 'PASS' : 'FAIL';
    const errorHTML = error ? `<div class="test-error">${error}</div>` : '';

    return `
        <div class="test-case ${passed ? 'pass' : 'fail'}">
            <span class="test-icon">${icon}</span>
            <span class="test-name">${name}</span>
            <span class="test-status ${passed ? 'pass' : 'fail'}">${status}</span>
            ${errorHTML}
        </div>
    `;
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
}

function assertGreaterThan(actual, expected, message) {
    if (actual <= expected) {
        throw new Error(message || `Expected ${actual} to be greater than ${expected}`);
    }
}

// Helper to load the main app's functions
async function loadMainApp() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '../script.js';
        script.onload = () => {
            // Wait a bit for initialization
            setTimeout(resolve, 500);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Helper to fetch products
async function getProducts() {
    const response = await fetch('../data.json');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
}

// ============================================
// TESTS
// ============================================

test('data.json exists and is valid JSON', async () => {
    const products = await getProducts();
    assert(Array.isArray(products), 'Products should be an array');
    assertGreaterThan(products.length, 0, 'Should have at least one product');
}, 'Data Loading');

test('Each product has required fields', async () => {
    const products = await getProducts();
    const requiredFields = ['id', 'name', 'category', 'price', 'rating', 'stock', 'image', 'description'];

    products.forEach((product, index) => {
        requiredFields.forEach(field => {
            assert(
                product.hasOwnProperty(field),
                `Product ${index} is missing field: ${field}`
            );
        });
    });
}, 'Data Loading');

test('Product prices are valid numbers', async () => {
    const products = await getProducts();
    products.forEach((product, index) => {
        assert(
            typeof product.price === 'number' && product.price > 0,
            `Product ${index} has invalid price: ${product.price}`
        );
    });
}, 'Data Loading');

test('index.html exists and loads without errors', async () => {
    const response = await fetch('../index.html');
    assert(response.ok, 'index.html should load successfully');
}, 'HTML Structure');

test('Products grid element exists', () => {
    const grid = document.querySelector('#products-grid');
    assert(grid !== null, 'Element with id "products-grid" should exist');
}, 'HTML Structure');

test('No results element exists', () => {
    const noResults = document.querySelector('#no-results');
    assert(noResults !== null, 'Element with id "no-results" should exist');
}, 'HTML Structure');

test('Page has proper semantic HTML structure', () => {
    assert(document.querySelector('header'), 'Should have a <header> element');
    assert(document.querySelector('main'), 'Should have a <main> element');
    assert(document.querySelector('h1'), 'Should have an <h1> element');
}, 'HTML Structure');

test('styles.css loads without errors', async () => {
    const response = await fetch('../styles.css');
    assert(response.ok, 'styles.css should load successfully');
    const css = await response.text();
    assertGreaterThan(css.length, 0, 'CSS file should not be empty');
}, 'Styling');

test('script.js loads without errors', async () => {
    const response = await fetch('../script.js');
    assert(response.ok, 'script.js should load successfully');
    const js = await response.text();
    assertGreaterThan(js.length, 0, 'JavaScript file should not be empty');
}, 'JavaScript');

test('No console errors on page load', async () => {
    const errors = [];
    const originalError = console.error;
    console.error = (...args) => {
        errors.push(args.join(' '));
        originalError(...args);
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.error = originalError;
    assertEqual(errors.length, 0, `Console errors found: ${errors.join(', ')}`);
}, 'JavaScript');

test('Search input should exist', () => {
    const searchInput = document.querySelector('input[type="text"]') ||
                       document.querySelector('input[type="search"]') ||
                       document.querySelector('#search') ||
                       document.querySelector('.search-input');
    assert(searchInput !== null, 'Search input field should exist');
}, 'Filtering UI');

test('Category filter should exist', () => {
    const categoryFilter = document.querySelector('select') ||
                          document.querySelector('#category') ||
                          document.querySelector('.category-filter');
    assert(categoryFilter !== null, 'Category filter dropdown should exist');
}, 'Filtering UI');

test('Sort dropdown should exist', () => {
    const selects = document.querySelectorAll('select');
    assert(selects.length >= 2, 'Should have at least 2 select elements (category and sort)');
}, 'Filtering UI');

test('Page is accessible (has lang attribute)', () => {
    const html = document.documentElement;
    assert(html.hasAttribute('lang'), 'HTML element should have lang attribute');
}, 'Accessibility');

test('Images should have alt attributes', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const images = document.querySelectorAll('img');
    if (images.length > 0) {
        images.forEach((img, index) => {
            assert(
                img.hasAttribute('alt'),
                `Image ${index} is missing alt attribute`
            );
        });
    }
}, 'Accessibility');

test('Form inputs have labels or aria-labels', () => {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input, index) => {
        const hasLabel = input.labels && input.labels.length > 0;
        const hasAriaLabel = input.hasAttribute('aria-label');
        const hasAriaLabelledBy = input.hasAttribute('aria-labelledby');

        assert(
            hasLabel || hasAriaLabel || hasAriaLabelledBy,
            `Input ${index} should have a label or aria-label`
        );
    });
}, 'Accessibility');

test('Responsive meta viewport tag exists', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    assert(viewport !== null, 'Page should have viewport meta tag for responsive design');
}, 'Responsive Design');

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-count').textContent = tests.length;
});
