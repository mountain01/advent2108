const {
  readInput
} = require('../util/input');

const nodes = {};
const startNode = new Set();
const endNode = new Set();

async function doChallenge() {
  const input = await readInput(__dirname);
  input.forEach(getNodes);

  Object.keys(nodes).map(key => {
    endNode.delete(key);
    return nodes[key]
  });
  const end = endNode.values().next().value;
  nodes[end] = new Node(end);
  Object.keys(nodes).map(key => nodes[key]).forEach(node => {
    node.makeBackEdges();
    node.forwardEdges.forEach(edge => {
      startNode.delete(edge);
    });
  });
  const starts = Array.from(startNode.values());
  ans = bfs(starts);
  console.log(ans);
}

function bfs(start) {
  let ans = '';
  const nodesToSearch = [...start];
  nodesToSearch.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  while (nodesToSearch.length > 0) {
    const nodeIndex = nodesToSearch.shift();
    nodes[nodeIndex].visited = true;
    if (!nodes[nodeIndex].canDo()) {
      nodesToSearch.push(nodeIndex);
      nodes[nodeIndex].visited = false;
      continue;
    }
    ans += nodeIndex;
    nodes[nodeIndex].forwardEdges.forEach(edge => {
      if (!nodes[edge].visited && nodesToSearch.indexOf(edge)===-1) {
        // nodes[edge].visited = true;
        nodesToSearch.push(edge);
      }
    })
    nodesToSearch.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  }
  return ans;
}

function getNodes(line) {
  const start = line.charAt(5);
  const end = line.charAt(36);
  startNode.add(start);
  endNode.add(end);
  if (!nodes[start]) {
    nodes[start] = new Node(start, end);
  } else {
    nodes[start].addForwardEdge(end);
  }
}

doChallenge()

class Node {
  constructor(name, edge) {
    this.name = name;
    this.forwardEdges = [];
    this.backwardEdges = [];
    this.visited = false;
    if (edge) {
      this.addForwardEdge(edge)
    }
  }

  addForwardEdge(edge) {
    this.forwardEdges.push(edge);
  }

  addBackwardEdge(edge) {
    this.backwardEdges.push(edge);
  }

  canDo() {
    return this.visited && this.backwardEdges.every(edge => nodes[edge].canDo());
  }

  makeBackEdges() {
    this.forwardEdges.forEach(edge => nodes[edge].addBackwardEdge(this.name));
  }
}