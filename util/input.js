const readFileAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function readInput(dir, file) {
  const input = await readFileAsync(path.resolve(dir, file ? file : 'input'), 'utf8');
  return input.split('\n');
}

module.exports = { readInput };