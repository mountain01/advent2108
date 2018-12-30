const {
  readInput
} = require('../util/input');

let thing;

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

  const score = getScore(maxX + 10, maxY + 10, 0, 0);
  const a = maxX + 500;
  const b = maxY + 500;
  const inf = getScore(a, b, -a, -b);
  Object.keys(score).forEach(key=>{
    if(score[key]!==inf[key]){
      delete score[key];
    }
  });
  const ans = Object.keys(score).map(a => score[a]).reduce((a, b) => Math.max(a, b));
  console.log(ans);
}

function getScore(x, y, sx, sy) {
  const score = {};

  for (let i = sx; i < x; i++) {
    for (let k = sy; k < y; k++) {
      const closestPoint = closest(i, k, thing).i;
      score[closestPoint] = score[closestPoint] || 0;
      score[closestPoint]++;
    }
  }
  return score;
}

function closest(x, y, input) {
  let d = Infinity;
  let closest;
  for (let p of input) {
    const distance = dist(p, {
      x,
      y
    });
    if (distance < d) {
      d = distance;
      closest = p;
    }
  }
  return closest;
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

doChallenge();