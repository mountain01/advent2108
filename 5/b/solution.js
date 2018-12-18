const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input;
}

getInput().then(input => {
  let min = Infinity;
  for(let i = 0; i<26;i++){
    const regex = new RegExp(String.fromCharCode(65+i),'ig');
    min = Math.min(min,shrink(input.replace(regex,'')));
  }
  console.log(min);
});

function shrink(polymer){
  const ans = polymer.split('').reduce((a, b) => {
    let retVal;
    const diff = Math.abs(a.charCodeAt(a.length - 1) - b.charCodeAt(0));
    if (diff===32) {
      retVal = a.slice(0, -1);
    } else {
      retVal = a + b;
    }
    return retVal;
  });
  return ans.length;
}