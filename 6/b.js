const {
  readInput
} = require('../util/input');

let thing;
const threshold = 10000;

async function doChallenge() {
  let maxX = maxY = -Infinity;
  const input = await readInput(__dirname);
  thing = input.map((a, i) => {
    const [x, y] = a.split(', ').map(a => +a);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    return {
      x,
      y,
      i
    };
  });

  score = [];

  for(let i = 0; i<maxX+10;i++){
    for(let k = 0; k<maxY+10;k++){
      score.push(closest(i,k));
    }
  }

  const ans = score.filter(a=>a<threshold).length;
  console.log(ans);
}

function closest(x, y) {
  let sum = 0;
  for (let p of thing) {
    const distance = dist(p, {
      x,
      y
    });
    sum += distance;
  }
  return sum;
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

doChallenge();