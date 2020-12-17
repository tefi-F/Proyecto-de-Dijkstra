class Graph {
  constructor() {
    this.nodes = [];
    this.adjacentList = {};
  }
  addNode(node) {
    this.nodes.push(node);
    this.adjacentList[node] = [];
  }
  addEdge(node1, node2, weight) {
    this.adjacentList[node1].push({ node: node2, weight: weight });
    this.adjacentList[node2].push({ node: node1, weight: weight });
  }
  dijkstra(startNode, endNode) {
    let times = {},
      backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;
    this.nodes.forEach((node) => {
      if (node !== startNode) {
        times[node] = Infinity;
      }
    });
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacentList[currentNode].forEach((neighbor) => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }
    console.log(
      `El camino más corto es ${path} con una distancia de ${times[endNode]}`
    );
    return path;
  }
}

class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i < this.collection.length; ++i) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }
  dequeue() {
    let value = this.collection.shift();
    return value;
  }
  isEmpty() {
    return this.collection.length === 0;
  }
}

const graph = new Graph();
const generateLink = () => {
  const messages = document.getElementById("messageGenerate");
  let valueR1 = document.getElementById("valueR1").value;
  let valueR2 = document.getElementById("valueR2").value;
  let peso = parseInt(document.getElementById("valuePeso").value);
  let count1 = 0;
  let count2 = 0;
  const found1 = text.includes(valueR1);
  if (valueR1 === valueR2) {
    console.error(`Los valores ${valueR1} y ${valueR2} no pueden ser iguales`);
    return (messages.innerHTML = `<h1 style="color: red;">Error los valores "${valueR1}" y "${valueR2}" no pueden ser iguales</h1>`);
  }
  const found2 = text.includes(valueR2);
  if (!found1) {
    console.error(`El valor de "${valueR1}" no fue establecido`);
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor "${valueR1}" no fue establecido</h1>`);
  }
  if (!found2) {
    console.error(`El valor de "${valueR2}" no fue establecido`);
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor "${valueR2}" no fue establecido</h1>`);
  }
  if (peso < 1) {
    console.error(`El valor de "${peso}" no es posible`);
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor "${peso}" no es posible</h1>`);
  }
  console.log(nodeDataAr);
  nodeDataAr.map((el) => {
    if (el.text !== valueR1) {
      count1++;
    }
    if (el.text !== valueR2) {
      count2++;
    }
  });
  if (count1 === nodeDataAr.length && count2 === nodeDataAr.length) {
    nodeDataAr.push({
      key: valueR1,
      text: valueR1,
    });
    nodeDataAr.push({
      key: valueR2,
      text: valueR2,
    });
  } else if (count2 === nodeDataAr.length) {
    nodeDataAr.push({
      key: valueR2,
      text: valueR2,
    });
  } else if (count1 === nodeDataAr.length) {
    nodeDataAr.push({
      key: valueR1,
      text: valueR1,
    });
  }
  linkDataAr.push({
    from: valueR1,
    to: valueR2,
    text: peso,
  });
  graph.addEdge(valueR1, valueR2, peso);
  myDiagram.model = new go.GraphLinksModel(nodeDataAr, linkDataAr);
  console.log(graph);
  console.log("Que rico Grafo 💘🧡💛💚💙💜🤎🖤🤍");
};

const pathShort = () => {
  const ans = document.getElementById("answerFinish");
  // const start = document.getElementById("start").value;
  // const end = document.getElementById("end").value;
  let path = graph.dijkstra(start, end);
  path.map((el, index) => {});
};

// This event handler is declared in the node template and is called when a node's
//   Node.isSelected property changes value.
// When a node is selected show distances from the first selected node.
// When a second node is selected, highlight the shortest path between two selected nodes.
// If a node is deselected, clear all highlights.
const nodeSelectionChanged = (node) => {
  console.log(node.lb.key);
  let diagram = node.diagram;
  if (diagram === null) return;
  diagram.clearHighlighteds();
  if (node.isSelected) {
    let sel = document.getElementById("myPaths");
    sel.innerHTML = "";
    let begin = diagram.selection.first();
    if (diagram.selection.count === 2) {
      let end = node; // just became selected
      console.log("Hola mundo", begin.lb.key, end.lb.key);
      highlightShortestPath(begin, end);
      listAllPaths(begin, end);
    }
  }
};

// Assume links are directional.
const highlightShortestPath = (begin, end) => {
  highlightPath(collectAllPaths(begin, end));
};

// Highlight a particular path, a List of Nodes.
const highlightPath = (path) => {
  myDiagram.clearHighlighteds();
  for (let i = 0; i < path.count - 1; i++) {
    let f = path.get(i);
    let t = path.get(i + 1);
    f.findLinksTo(t).each((l) => {
      l.isHighlighted = true;
    });
  }
};

const collectAllPaths = (begin, end) => {
  let path = new go.List(/*go.List*/);
  let pathS = graph.dijkstra(begin.lb.key, end.lb.key);
  const find = (source) => {
    source.findNodesOutOf().each((n) => {
      console.log(n);
      if (pathS.includes(n)) {
        path.add(n);
      }
    });
  };
  find(begin, end);
  console.log(path);
  return path;
};
