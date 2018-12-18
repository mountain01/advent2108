const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'input'), 'utf8');
  return input.split('\n');
}

// const schedule = {
//   guardId: {
//     table: [dates][minutes]
//   }
// }

function sortInput(a, b) {
  const dateRegex = /\[(.*)\]/
  let [, aDate] = dateRegex.exec(a);
  aDate = Date.parse(aDate);
  let [, bDate] = dateRegex.exec(b);
  bDate = Date.parse(bDate);
  return aDate - bDate;
}


const schedule = {};

getInput().then(input => {
  const dateRegex = /\[(.*)\]/;
  const idRegex = /.*#(\d+)?.*/;
  input.sort(sortInput);
  let lastId;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [, date] = (dateRegex).exec(line);
    if (idRegex.test(line)) {
      lastId = idRegex.exec(line)[1];
      start = 0;
      continue;
    }

    const awake = line.toLowerCase().indexOf('wakes') !== -1;
    if (!schedule[lastId]) {
      schedule[lastId] = {
        totalAsleep: 0,
        id: lastId
      }
    }
    const [, day, time] = (/(.*)\s\d{2}:(\d+)/).exec(date);
    schedule[lastId][day] = schedule[lastId][day] || new Array(60).fill(0);
    for (let k = start; k < time; k++) {
      const val = awake ? 1 : 0;
      schedule[lastId][day][k] = val;
      schedule[lastId].totalAsleep += val;
    }
    start = time;
  }
  console.log(getMostAsleepGuard());
});

function getMostAsleepGuard() {
  let mostAsleepMinute = 0;
  const guards = Object.keys(schedule).map(key => schedule[key]).map(a => ({ ...a,
    time: Object.keys(a).map(key => a[key]).filter(a => Array.isArray(a))
  }));
  let minute = 0;
  let chosenGuard;
  let max = 0;
  //transpose matrix
  guards.forEach(guard => {
    const transposed = guard.time[0].map((col, i, arr) => guard.time.map(row => row[i])).map(time => time.reduce((a, b) => a + b));
    transposed.forEach((a,i)=>{
      if(a>max){
        max = a;
        minute = i;
        chosenGuard = guard.id;
      }
    })
  });
  return +chosenGuard*minute;
}