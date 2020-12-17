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
    let values = {},
      backtrace = {};
    let pq = new PriorityQueue();
    values[startNode] = 0;
    this.nodes.forEach((node) => {
      if (node !== startNode) {
        values[node] = Infinity;
      }
    });
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacentList[currentNode].forEach((neighbor) => {
        let time = values[currentNode] + neighbor.weight;
        if (time < values[neighbor.node]) {
          values[neighbor.node] = time;
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
      `El camino más corto es ${path} con una distancia de ${values[endNode]}`
    );
    return [
      path,
      values[endNode],
      `El camino más corto es ${path} con una distancia de ${values[endNode]}`,
    ];
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
      color: go.Brush.randomColor(128, 240),
    });
    nodeDataAr.push({
      key: valueR2,
      text: valueR2,
      color: go.Brush.randomColor(128, 240),
    });
  } else if (count2 === nodeDataAr.length) {
    nodeDataAr.push({
      key: valueR2,
      text: valueR2,
      color: go.Brush.randomColor(128, 240),
    });
  } else if (count1 === nodeDataAr.length) {
    nodeDataAr.push({
      key: valueR1,
      text: valueR1,
      color: go.Brush.randomColor(128, 240),
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
};

const pathShort = () => {
  const ans = document.getElementById("answerFinish");
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  let answer = graph.dijkstra(start, end);
  ans.innerHTML = answer[2];
};

const nodeSelectionChanged = (node) => {
  let diagram = node.diagram;
  if (diagram === null) return;
  diagram.clearHighlighteds();
  if (node.isSelected) {
    let ans = document.getElementById("answerFinish");
    let pathAnswer = document.getElementById("pathAnswer");
    let start = document.getElementById("start");
    let finish = document.getElementById("end");
    let begin = diagram.selection.first();
    ans.innerHTML = "";
    start.value = begin.lb.key;
    if (diagram.selection.count === 2) {
      let end = node;
      finish.value = end.lb.key;
      const answer = graph.dijkstra(begin.lb.key, end.lb.key);
      ans.innerHTML = `<p style="
            background: #999894;
            color: white;
            border-color: white;
            width: 50rem;
            height: 3.4rem;
            font-size: 2.0rem;
            text-align: center;
          ">${answer[2]}</p>`;
      for (let i = 0; i < answer[0].length; i++) {
        if (i < answer[0].length - 1) {
          console.log(answer[0][i]);
          pathAnswer.innerHTML += `<p style="            
            background: #999894;
            color: white;
            border-color: white;
            font-size: 2.0rem;
            text-align: center">${answer[0][i]}-----</p>`;
        } else {
          pathAnswer.innerHTML += `<p style="            
            background: #999894;
            color: white;
            border-color: white;
            font-size: 2.0rem;
            text-align: center">${answer[0][i]}</p>`;
        }
      }
    }
  }
};
