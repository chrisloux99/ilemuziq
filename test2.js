const { execSync } = require('child_process');
const fs = require('fs');
try {
  console.log('running...');
  execSync('npx electron-vite dev', { encoding: 'utf8', stdio: 'pipe' });
  console.log('done running successfully');
} catch (error) {
  console.log('crashed!');
  fs.writeFileSync('error2.log', (error.stdout || '') + '\n\n---STDERR---\n\n' + (error.stderr || ''));
}
