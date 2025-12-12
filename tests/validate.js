import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let hasErrors = false;

function error(message) {
    console.error(`❌ ${message}`);
    hasErrors = true;
}

function success(message) {
    console.log(`✅ ${message}`);
}

function info(message) {
    console.log(`ℹ️  ${message}`);
}

console.log('\n🔍 Running validation checks...\n');

// Check required files exist
const requiredFiles = [
    '../index.html',
    '../styles.css',
    '../script.js',
    '../data.json'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        success(`${file} exists`);
    } else {
        error(`${file} is missing`);
    }
});

// Check data.json is valid
console.log('\n📦 Validating data.json:');
try {
    const dataPath = path.join(__dirname, '../data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    if (data.products && Array.isArray(data.products)) {
        success(`data.json is valid (${data.products.length} products)`);
    } else {
        error('data.json does not contain a products array');
    }
} catch (err) {
    error(`data.json is not valid JSON: ${err.message}`);
}

// Check HTML structure
console.log('\n🏗️  Validating HTML structure:');
try {
    const htmlPath = path.join(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    const checks = [
        { pattern: /<html[^>]+lang=/i, message: 'HTML has lang attribute' },
        { pattern: /<meta[^>]+viewport/i, message: 'Has viewport meta tag' },
        { pattern: /<header>/i, message: 'Has <header> element' },
        { pattern: /<main>/i, message: 'Has <main> element' },
        { pattern: /id=["']products-grid["']/i, message: 'Has products-grid element' },
        { pattern: /id=["']no-results["']/i, message: 'Has no-results element' },
    ];

    checks.forEach(check => {
        if (check.pattern.test(html)) {
            success(check.message);
        } else {
            error(check.message + ' - NOT FOUND');
        }
    });
} catch (err) {
    error(`Error reading index.html: ${err.message}`);
}

// Check CSS file is not empty
console.log('\n🎨 Validating CSS:');
try {
    const cssPath = path.join(__dirname, '../styles.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    if (css.trim().length > 100) {
        success('styles.css contains styling');
    } else {
        info('styles.css appears minimal (candidates should add more styles)');
    }
} catch (err) {
    error(`Error reading styles.css: ${err.message}`);
}

// Check JavaScript file
console.log('\n📜 Validating JavaScript:');
try {
    const jsPath = path.join(__dirname, '../script.js');
    const js = fs.readFileSync(jsPath, 'utf8');

    const checks = [
        { pattern: /fetch.*data\.json/i, message: 'Fetches data.json' },
        { pattern: /addEventListener|on\w+\s*=/i, message: 'Has event listeners' },
    ];

    checks.forEach(check => {
        if (check.pattern.test(js)) {
            success(check.message);
        } else {
            info(check.message + ' - Not detected (may be implemented differently)');
        }
    });
} catch (err) {
    error(`Error reading script.js: ${err.message}`);
}

// Final summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
    console.log('❌ Validation failed - please fix the errors above\n');
    process.exit(1);
} else {
    console.log('✅ Validation passed!\n');
    process.exit(0);
}
