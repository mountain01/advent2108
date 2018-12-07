const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input.split('\n');
}

getInput().then(input => {
  const ans = [];
  const [a, b] = input.filter(a => {
    return input.some(b => {
      let err = 0;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        err += a.charAt(i) === b.charAt(i) ? 0 : 1;
        if (err > 1) {
          return false;
        }
      }
      return err === 1;
    })
  });
  for (let i = 0; i < a.length; i++) {
    if(a.charAt(i) === b.charAt(i)){
      ans.push(a.charAt(i))
    }
  }
  return ans.join('');
}).then(console.log);