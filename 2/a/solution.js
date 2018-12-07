const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput(){
  const input = await readAsync(path.resolve(__dirname,'input'),'utf8');
  return input.split('\n');
}

let threes = 0;
let fours = 0;

const count = (obj, num) => {
  return Object.keys(obj).map(key=>obj[key]).some(a=>a===num);
}

getInput().then(input=>{
  input.forEach(thing=>{
    const contents = thing.split('').reduce((a,b)=>{
      if(!a[b]) a[b]=0;
      a[b]++;
      return a;
    },{});
    threes += count(contents, 3) ? 1:0;
    fours += count(contents,2) ? 1:0;
  })
}).then(()=>console.log(`${threes} * ${fours} = ${threes*fours}`));