const fs = require('fs');
const path = require('path');
const readAsync = require('util').promisify(fs.readFile);

async function readFile(){
  const input = await readAsync(path.resolve(__dirname,'input'), 'utf8');
  return input.split('\n').join(' ');
}

readFile().then(a=>{
  const ans = eval('0 '+ a);
  console.log(ans);
});