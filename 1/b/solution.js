const readAsync = require('util').promisify(require('fs').readFile);
const path = require('path');

async function getInput(){
  const input = await readAsync(path.resolve(__dirname,'input'),'utf8');
  return input.split('\n').map(a=>+a);
}

const things = [];
things[0]=true;
let retVal;

getInput().then(thing=>{
  let start = 0;
  while(!!!retVal){
    start = thing.reduce((a,b)=>{
      const ans = a+b;
      if(things[ans] && !!!retVal){
        retVal = ans;
      }
      things[ans] = true;
      return ans;
    },start)
  }
}).then(()=>console.log(retVal));