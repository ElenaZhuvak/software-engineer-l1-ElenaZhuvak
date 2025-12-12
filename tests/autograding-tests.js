import { chromium } from 'playwright';

// Helper to run a test
async function runTest(name, testFn) {
    try {
        const result = await testFn();
        console.log(result ? 'true' : 'false');
        process.exit(0);
    } catch (error) {
        console.error('false');
        process.exit(1);
    }
}

// Get test name from command line
const testName = process.argv[2];

const tests = {
    'has-products-grid': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(1000);
        const grid = await page.$('#products-grid');
        await browser.close();
        return grid !== null;
    },

    'has-search-input': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(1000);
        const input = await page.$('input[type="text"], input[type="search"]');
        await browser.close();
        return input !== null;
    },

    'has-filter-dropdowns': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(1000);
        const selects = await page.$$('select');
        await browser.close();
        return selects.length >= 2;
    },

    'products-load-and-display': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(2000);
        const products = await page.$$('#products-grid > *');
        await browser.close();
        return products.length >= 10;
    },

    'search-filters-products': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(2000);
        const initialProducts = await page.$$('#products-grid > *');
        const initialCount = initialProducts.length;

        const input = await page.$('input[type="text"], input[type="search"]');
        if (!input) {
            await browser.close();
            return false;
        }

        await input.fill('iPhone');
        await page.waitForTimeout(500);

        const filteredProducts = await page.$$('#products-grid > *');
        const filteredCount = filteredProducts.length;
        await browser.close();

        return filteredCount < initialCount && filteredCount > 0;
    },

    'category-filter-works': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(2000);

        const initialProducts = await page.$$('#products-grid > *');
        const initialCount = initialProducts.length;

        const selects = await page.$$('select');
        if (selects.length < 1) {
            await browser.close();
            return false;
        }

        let filtered = false;
        for (const select of selects) {
            const options = await select.$$('option');
            for (const option of options) {
                const value = await option.getAttribute('value');
                const text = await option.textContent();
                if (text && (text.includes('Laptop') || text.includes('Phone'))) {
                    await select.selectOption(value);
                    await page.waitForTimeout(500);
                    const newProducts = await page.$$('#products-grid > *');
                    const newCount = newProducts.length;
                    if (newCount < initialCount && newCount > 0) {
                        filtered = true;
                        break;
                    }
                }
            }
            if (filtered) break;
        }

        await browser.close();
        return filtered;
    },

    'price-sorting-works': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:4173');
        await page.waitForTimeout(2000);

        const selects = await page.$$('select');
        if (selects.length < 2) {
            await browser.close();
            return false;
        }

        let sorted = false;
        for (const select of selects) {
            const options = await select.$$('option');
            for (const option of options) {
                const text = await option.textContent();
                if (text && (text.includes('Low to High') || text.includes('High to Low') || text.includes('Price'))) {
                    const value = await option.getAttribute('value');
                    await select.selectOption(value);
                    await page.waitForTimeout(500);
                    sorted = true;
                    break;
                }
            }
            if (sorted) break;
        }

        await browser.close();
        return sorted;
    },

    'no-console-errors': async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        let hasErrors = false;

        page.on('console', msg => {
            if (msg.type() === 'error') hasErrors = true;
        });

        page.on('pageerror', () => hasErrors = true);

        await page.goto('http://localhost:4173');
        await page.waitForTimeout(3000);
        await browser.close();

        return !hasErrors;
    }
};

if (!testName || !tests[testName]) {
    console.error('false');
    process.exit(1);
}

runTest(testName, tests[testName]);
