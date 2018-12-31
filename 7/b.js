const {
  readInput
} = require('../util/input');

const nodes = {};
const startNode = new Set();
const endNode = new Set();
const numWorkers = 5;
const taskTime = 60;

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
  const order = bfs(starts).split('');
  Object.keys(nodes).map(key => nodes[key]).forEach(a => a.visited = false);
  const time = work(order);
  console.log(time);
}

function work(steps) {
  const tasks = new Set(steps);
  const workers = [];
  workers.idle = function() {
    return this.every(a => a.idle());
  };
  workers.work = function() {
    this.forEach(a=>a.work());
  };
  seconds = 0;
  for (let i = 0; i < numWorkers; i++) {
    workers.push(new Worker());
  }
  while (tasks.size > 0 || !workers.idle()) {
    workers.work();
    for (let w of workers) {
      for (let task of tasks.values()) {
        nodes[task].finished = true;
        if (w.idle() && w.canDo(task)) {
          nodes[task].finished = false;
          w.giveTask(task);
          tasks.delete(task);
          break;
        }
        nodes[task].finished = false;
      }
    }
    seconds++;
  }
  return seconds-1;
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
      if (!nodes[edge].visited && nodesToSearch.indexOf(edge) === -1) {
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
    this.finished = false;
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

  canWork() {
    return this.finished && this.backwardEdges.every(edge => nodes[edge].canWork());
  }

  makeBackEdges() {
    this.forwardEdges.forEach(edge => nodes[edge].addBackwardEdge(this.name));
  }
}

class Worker {
  constructor() {
    this.time = 0;
    this.task;
  }

  idle() {
    return !this.task;
  }

  giveTask(task) {
    this.time = task.charCodeAt(0) - 64 + taskTime;
    this.task = task;
    nodes[task].isWorking = true;
  }

  work() {
    if (--this.time === 0 && this.task) {
      nodes[this.task].finished = true;
      this.task = null;
    }
  }

  canDo(task) {
    return nodes[task].backwardEdges.length === 0 || nodes[task].canWork();
  }
}