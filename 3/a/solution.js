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
  const [left,top] = claim.spacing.split(',').map(a=>+a);
  const [w,h] = claim.size.split('x').map(a=>+a);
  for(let i = 0;i<w;i++){
    for (let k = 0; k < h; k++) {
      cloth[left+i] = cloth[left+i] || [];
      if(cloth[left+i][top+k]) {
        cloth[left+i][top+k] = 'X'
      } else {
        cloth[left+i][top+k] = claim.id;
      }
    }
  }
}

function checkForX(){
  let count = 0;
  for (let i = 0; i < cloth.length; i++) {
    const element = cloth[i];
    for (let k = 0; k < element.length; k++) {
      const spot = element[k];
      count += spot === 'X'? 1:0;
    }
  }
  console.log(count);
}

getInput().then(input => {
  const parsedInput = input.map(parseClaim);
  parsedInput.forEach(addToGrid);
  checkForX();
  console.log('hello');
});