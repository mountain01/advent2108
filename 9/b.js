const {
  readInput
} = require('../util/input');

let score;
let circle;
let current;

async function doChallenge() {
  const input = await readInput(__dirname);

  for (let line of input) {
    score = {};
    circle = new Marble(0);
    current = circle;
    const [players, marbles, expected] = line.match(/\d+/g).map(Number);


    for (let i = 1; i <= (marbles*100); i++) {
      const player = i % players;
      if (!(i % 23)) {
        addToScore(player, i);
      } else {
        add(i)
      }
      // printCircle();
    }

    const ans = Object.keys(score).map(key => score[key]).reduce((a, b) => Math.max(a, b));
    console.log(ans, expected);
  }
}

function printCircle() {
  const start = circle.number;
  let val = `${start}`;
  let thing = circle.next;
  while (thing.number !== start) {
    val += ` --> ${thing.number}`;
    thing = thing.next;
  }
  console.log(val);
}

function add(marble) {
  const newMarble = new Marble(marble);

  current.next.add(newMarble);
  current = newMarble;
}

function addToScore(player, marble) {
  score[player] = score[player] || 0;
  score[player] += +marble;
  for (let i = 0; i < 6; i++) {
    current = current.prev;
  }
  score[player] += +current.prev.pop();
}

doChallenge();

class Marble {
  constructor(number) {
    this.number = number;
    this.next = this;
    this.prev = this;
  }

  add(marble) {
    marble.prev = this;
    marble.next = this.next;
    this.next.prev = marble;
    this.next = marble;
  }

  remove(){
    const temp = this.next;
    this.prev.next = temp;
    temp.prev = this.prev;
    delete this;
  }

  pop(){
    const val = this.number;
    this.remove();
    return val;
  }
}