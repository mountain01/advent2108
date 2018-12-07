const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input.split('\n');
}

getInput().then(input => {
  console.log(input);
});