const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput() {
  const input = await readAsync(path.resolve(__dirname, 'inputa'), 'utf8');
  return input.split('\n');
}

// const schedule = {
//   guardId: {
//     table: [dates][minutes]
//   }
// }

function sortInput(a,b){
  const dateRegex = /\[(.*)\]/
  let [,aDate] = dateRegex.exec(a);
  aDate = Date.parse(aDate);
  let [,bDate] = dateRegex.exec(b);
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
    if(idRegex.test(line)){
      lastId = idRegex.exec(line)[1];
      start = 0;
      continue;
    }

    const awake = line.toLowerCase().indexOf('wakes') !== -1;
    if (!schedule[lastId]) {
      schedule[lastId] = {totalAsleep:0,id:lastId}
    }
    const [, day, time] = (/(.*)\s\d{2}:(\d+)/).exec(date);
    schedule[lastId][day] = schedule[lastId][day] || new Array(60).fill(0);
    for(let k = start; k< time;k++){
      const val = awake?1:0;
      schedule[lastId][day][k] = val;
      schedule[lastId].totalAsleep += val;
    }
    start = time;
  }
  console.log(getMostAsleepGuard());
});

function getMostAsleepGuard(){
  let mostAsleepMinute = 0;
  const guard = Object.keys(schedule).map(key=>schedule[key]).reduce((a,b)=>{
    return a.totalAsleep > b.totalAsleep ? a: b;
  });
  let minute = 0;
  const timeMatrix = Object.keys(guard).map(key=>guard[key]).filter(a=>Array.isArray(a));
  //transpose matrix
  const transposed = timeMatrix[0].map((col,i,arr)=>timeMatrix.map(row=>row[i]));
  let max = 0;
  transposed.map(time=>time.reduce((a,b)=>a+b)).forEach((a,i)=>{
    if(a>max){
      max = a;
      mostAsleepMinute = i;
    }
  });
  return +guard.id*mostAsleepMinute;
}