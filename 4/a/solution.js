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
  input.sort(sortInput);
  let lastId;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [, date] = (/\[(.*)\].*/).exec(line);
    const [,id]=/.*#(\d+)?.*/.exec(line);

    if (id) {
      lastId = id;
      start = 0;
    }
    if (!schedule[lastId]) {
      schedule[lastId] = {}
    }
    const [, day, time] = (/(.*)\s\d{2}:(\d+)/).exec(date);
    schedule[lastId][day] = new Array(60);
    for(let k = start; k< time;k++){
      schedule[lastId][day][k] = 'a';
    }
    start = time;
  }
});