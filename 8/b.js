const {
  readInput
} = require('../util/input');

async function doChallenge() {
  const input = await readInput(__dirname);

  const node = createTree(input[0].split(' '));

  const total = getTotal(node);

  console.log(total);
}

function getTotal(node) {
  if(node.hasChildren()){
    return node.meta.reduce((a,b)=>{
      let val = 0;
      if(b-1 < node.children.length){
        val = getTotal(node.children[b-1])
      }
      return a + val;
    },0);
  } else {
    return node.meta.reduce((a,b)=>a+b,0);
  }
}

function createTree(input) {
  const numChild = input.shift();
  const numMeta = input.shift();
  const node = new Node(numChild, numMeta);
  for (let i = 0; i < numChild; i++) {
    node.addChild(createTree(input));
  }
  for (let i = 0; i < numMeta; i++) {
    node.addMeta(+input.shift());
  }

  return node;
}

doChallenge();

class Node {
  constructor(childCount, metaCount) {
    this.childCount = childCount;
    this.metaCount = metaCount;
    this.meta = [];
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  addMeta(meta) {
    this.meta.push(meta);
  }

  hasChildren(){
    return this.children.length > 0;
  }
}