const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input;
}

getInput().then(input => {
  console.log(input);
  let edit = true;
  const ans = input.split('').reduce((a, b) => {
    let retVal;
    const diff = Math.abs(a.charCodeAt(a.length - 1) - b.charCodeAt(0));
    if (diff===32) {
      retVal = a.slice(0, -1);
    } else {
      retVal = a + b;
    }
    return retVal;
  });
  console.log(ans, ans.length);
});