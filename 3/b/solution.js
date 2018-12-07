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
    size,
    total: eval(size.replace('x','*')),
    count:0
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
      if(spot){
        parsedInput[spot].count++;
      }
    }
  }
  console.log(count);
}
let parsedInput = {X:{total:0,count:0}};

getInput().then(input => {
  input.reduce((a,claim)=>{
    const parsedClaim = parseClaim(claim);
    addToGrid(parsedClaim);
    a[parsedClaim.id] = parsedClaim;
    return a;
  },parsedInput);
  checkForX();
  for (const prop in parsedInput) {
    if (parsedInput.hasOwnProperty(prop)) {
      const claim = parsedInput[prop];
      if(claim.count===claim.total){
        console.log(claim);
        break;
      }
    }
  }
});