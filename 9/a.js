const {
  readInput
} = require('../util/input');

let score = {};
let circle = [0];
let current = 0;

async function doChallenge() {
  const input = await readInput(__dirname);

  for (let line of input) {
    score = {};
    circle = [0];
    current = 0;
    const [players, marbles, expected] = line.match(/\d+/g).map(Number);


    for (let i = 1; i <= marbles; i++) {
      const player = i % players;
      if (!(i % 23)) {
        addToScore(player, i);
      } else {
        add(i)
      }
    }

    const ans = Object.keys(score).map(key => score[key]).reduce((a, b) => Math.max(a, b));
    console.log(ans, expected);
  }
}

function add(marble) {
  let index = ((current + 1) % circle.length) + 1;
  circle.splice(index, 0, marble);
  current = index;
}

function addToScore(player, marble) {
  score[player] = score[player] || 0;
  score[player] += +marble;
  let index = (current - 7 + circle.length) % circle.length;
  score[player] += +circle.splice(index, 1);
  current = (index) % circle.length;
}

doChallenge();