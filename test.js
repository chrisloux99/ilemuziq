const { spawn } = require('child_process');
const fs = require('fs');

const child = spawn('cmd.exe', ['/c', 'pnpm run dev'], { shell: true });
let log = '';
let foundError = false;

child.stdout.on('data', (data) => {
    log += data.toString();
    if (log.includes('[ERROR]') && !foundError) {
        foundError = true;
        setTimeout(() => {
            fs.writeFileSync('error.log', log);
            child.kill();
            process.exit(1);
        }, 1000); // give it a second to capture the full stack trace
    }
});

child.stderr.on('data', (data) => {
    log += data.toString();
    if (log.includes('[ERROR]') && !foundError) {
        foundError = true;
        setTimeout(() => {
            fs.writeFileSync('error.log', log);
            child.kill();
            process.exit(1);
        }, 1000);
    }
});

setTimeout(() => {
    if (!foundError) {
        fs.writeFileSync('error.log', log);
        child.kill();
        process.exit(0);
    }
}, 15000); // 15s timeout
