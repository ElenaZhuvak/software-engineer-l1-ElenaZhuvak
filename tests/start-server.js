import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startServer() {
    return new Promise((resolve, reject) => {
        const server = spawn('npm', ['run', 'preview'], {
            cwd: path.join(__dirname, '..'),
            stdio: 'pipe',
            shell: true
        });

        let serverReady = false;

        server.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(output);

            if (output.includes('4173') && !serverReady) {
                serverReady = true;
                setTimeout(() => resolve(server), 1000);
            }
        });

        server.stderr.on('data', (data) => {
            console.error(`Server error: ${data}`);
        });

        server.on('error', (error) => {
            reject(error);
        });

        // Timeout after 10 seconds
        setTimeout(() => {
            if (!serverReady) {
                server.kill();
                reject(new Error('Server failed to start within 10 seconds'));
            }
        }, 10000);
    });
}

export function stopServer(server) {
    if (server) {
        server.kill();
    }
}
