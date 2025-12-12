import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const timestampFile = path.join(rootDir, '.assessment-start-time');

// Check if timestamp already exists
if (fs.existsSync(timestampFile)) {
    console.log('⏱️  Assessment timer already started.');
    const startTime = fs.readFileSync(timestampFile, 'utf8');
    console.log(`   Start time: ${new Date(parseInt(startTime)).toISOString()}`);
    process.exit(0);
}

console.log('\n' + '='.repeat(60));
console.log('🚀 STARTING YOUR ASSESSMENT TIMER');
console.log('='.repeat(60));
console.log('\nThis is your official start time for the 2-hour assessment.');
console.log('A timestamp file will be created and committed automatically.\n');

// Create timestamp file
const startTime = Date.now();
fs.writeFileSync(timestampFile, startTime.toString());

console.log(`⏰ Timer started at: ${new Date(startTime).toISOString()}\n`);

// Check if we're in a git repo
try {
    execSync('git rev-parse --git-dir', { cwd: rootDir, stdio: 'ignore' });
} catch (error) {
    console.log('⚠️  Not in a git repository. Timestamp file created but not committed.');
    console.log('   Please commit it manually:\n');
    console.log('   git add .assessment-start-time');
    console.log('   git commit -m "Start assessment timer"');
    console.log('   git push\n');
    process.exit(0);
}

// Remove START.md if it exists
const startMdPath = path.join(rootDir, 'START.md');
if (fs.existsSync(startMdPath)) {
    fs.unlinkSync(startMdPath);
    console.log('✅ Removed START.md');
}

// Auto-commit the timestamp
try {
    // Check if there are any existing commits
    try {
        execSync('git rev-parse HEAD', { cwd: rootDir, stdio: 'ignore' });
    } catch {
        // No commits yet, make an initial commit
        console.log('📝 Creating initial commit...');
        execSync('git add .', { cwd: rootDir, stdio: 'ignore' });
        execSync('git commit -m "Initial commit from template"', { cwd: rootDir, stdio: 'ignore' });
    }

    // Stage and commit timestamp file
    execSync('git add .assessment-start-time', { cwd: rootDir, stdio: 'ignore' });

    // Check if START.md was removed
    if (!fs.existsSync(startMdPath)) {
        try {
            execSync('git add START.md', { cwd: rootDir, stdio: 'ignore' });
        } catch {
            // File might not be tracked yet
        }
    }

    const commitMessage = `Start assessment - ${new Date(startTime).toISOString()}`;
    execSync(`git commit -m "${commitMessage}"`, { cwd: rootDir, stdio: 'ignore' });

    console.log('✅ Timestamp committed to git');
    console.log('\n⚠️  IMPORTANT: Push your changes now to record your start time:\n');
    console.log('   git push\n');
    console.log('='.repeat(60));
    console.log('Good luck! You have 2 hours from now.');
    console.log('='.repeat(60) + '\n');

} catch (error) {
    console.error('⚠️  Could not auto-commit timestamp:', error.message);
    console.log('\n   Please commit it manually:\n');
    console.log('   git add .assessment-start-time');
    console.log('   git commit -m "Start assessment timer"');
    console.log('   git push\n');
}
