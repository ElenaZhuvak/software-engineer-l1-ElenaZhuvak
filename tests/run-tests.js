import { chromium } from 'playwright';
import { startServer, stopServer } from './start-server.js';

async function runTests() {
    console.log('🚀 Starting preview server...\n');

    let server;
    try {
        server = await startServer();
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.error('Make sure to run "npm run build" first.\n');
        process.exit(1);
    }

    console.log('\n🧪 Running automated tests...\n');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    const logs = [];

    // Capture console messages
    page.on('console', msg => {
        const text = msg.text();
        logs.push({ type: msg.type(), text });

        if (msg.type() === 'error') {
            errors.push(text);
        }
    });

    // Capture page errors
    page.on('pageerror', error => {
        errors.push(error.message);
    });

    try {
        // Navigate to test page
        await page.goto('http://localhost:4173/tests/test.html', {
            waitUntil: 'networkidle',
            timeout: 10000
        });

        // Wait for page to load
        await page.waitForTimeout(1000);

        // Click run tests button
        await page.click('.run-tests-btn');

        // Wait for tests to complete
        await page.waitForTimeout(5000);

        // Get test results
        const passed = await page.textContent('#passed-count');
        const failed = await page.textContent('#failed-count');
        const total = await page.textContent('#total-count');

        console.log('📊 Test Results:');
        console.log(`   ✅ Passed: ${passed}`);
        console.log(`   ❌ Failed: ${failed}`);
        console.log(`   📝 Total:  ${total}`);
        console.log('');

        // Get failed test details
        const failedTests = await page.$$eval('.test-case.fail', elements =>
            elements.map(el => ({
                name: el.querySelector('.test-name')?.textContent || 'Unknown',
                error: el.querySelector('.test-error')?.textContent || 'No error message'
            }))
        );

        if (failedTests.length > 0) {
            console.log('❌ Failed Tests:');
            failedTests.forEach(test => {
                console.log(`\n   ${test.name}`);
                console.log(`   └─ ${test.error}`);
            });
            console.log('');
        }

        await browser.close();
        stopServer(server);

        // Check for console errors
        if (errors.length > 0) {
            console.error('⚠️  Console errors detected:');
            errors.forEach(err => console.error(`   - ${err}`));
            console.log('');
        }

        // Exit with appropriate code
        if (parseInt(failed) > 0 || errors.length > 0) {
            console.log('❌ Tests failed!\n');
            process.exit(1);
        } else {
            console.log('✅ All tests passed!\n');
            process.exit(0);
        }

    } catch (error) {
        console.error('❌ Error running tests:', error.message);
        await browser.close();
        stopServer(server);
        process.exit(1);
    }
}

runTests();
