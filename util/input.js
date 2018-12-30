const readFileAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function readInput(dir, example) {
  const input = await readFileAsync(path.resolve(dir, example ? 'input.example' : 'input'), 'utf8');
  return input.split('\n');
}

module.exports = { readInput };