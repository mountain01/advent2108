const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

const cloth = [];

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input.split('\n');
}

function parseClaim(claim) {
  const [, id, spacing, size] = /#(\d+)\s*@\s(\d+,\d+):\s*(\d+x\d+)/.exec(claim);

  return {
    id,
    spacing,
    size
  };
}

function addToGrid(claim){
  const [left,top] = claim.spacing.split(',');
  const [w,h] = claim.size.split('x');
  for(let i = 0;i<w;i++){
    for (let k = 0; k < h; k++) {
      cloth[w+i] = cloth[w+i] || [];
      if(cloth[w+i][h+k]) {
        cloth[w+i][h+k] = 'X'
      } else {
        cloth[w+i][h+k] = claim.id;
      }
    }
  }
}

getInput().then(input => {
  const parsedInput = input.map(parseClaim);
  addToGrid(parsedInput[0]);
});