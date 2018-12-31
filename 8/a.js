const { readInput} = require('../util/input');

async function doChallenge(){
  const input = await readInput(__dirname, true);

  console.log(input);
}

doChallenge();