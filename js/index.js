const ar = [];
const text = [];
const nodeDataAr = [];
const linkDataAr = [];
let grafo = {};

const dijkstra = (array = undefined) => {
  if (array === undefined) {
    return console.error("Error no mando ningun array");
  }
  if (!(array instanceof Array)) {
    return console.error(`El valor ${array} no es un arreglo`);
  }
  for (let value of array) {
    if (typeof value !== "number" || value > 1 || value < 0) {
      return console.error(
        `El valor ${value} no es un numero o no esta en el rango de valores validos`
      );
    }
  }
};

const generarNames = () => {
  const messages = document.getElementById("messageGenerate");
  let len = document.getElementById("len").value;
  if (!len) {
    console.error(
      "Error no puede entregar ese valor para continuar con el programa"
    );
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor ${len} no es válido</h1>
    <p style="color: blue">para seguir intente de ingresando un número positivo para la cantidad de nodos del grafo</p>`);
  }
  len = parseInt(len);
  if (len < 1) {
    console.error(
      "Error no puede entregar valore menores a 0 para seguir con el programa"
    );
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor ${len} no es válido</h1>
    <p style="color: blue">para seguir intente de ingresando un número positivo para la cantidad de nodos del grafo</p>`);
  }
  messages.innerHTML = "";
  for (let i = 0; i < len; ++i) {
    messages.innerHTML += `<input type="text" class="input-initial" id="text${i}" placeholder="name" required>`;
  }
  messages.innerHTML += `<button class="btn btn-success" onclick="generateArray();">Ingresar Nodos</button>`;
};

const generateArray = () => {
  const messages = document.getElementById("messageGenerate");
  let len = parseInt(document.getElementById("len").value);
  console.info(len);
  if (len < 1) {
    console.error(
      "Error no puede entregar 0 valores para continuar con el cálculo"
    );
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor ${len} no es válido</h1>
    <p style="color: blue">para seguir intente de nuevo</p>`);
  }
  if (len > 20) {
    console.error("Error no puede generar un grafo de más de 20 nodos");
    return (messages.innerHTML = `<h1 style="color: red;">Error no se puede generar más de 20 nodos</h1>`);
  }
  for (let i = 0; i < len; i++) {
    console.info(text[i]);
    text[i] = document.getElementById(`text${i}`).value;
  }
  console.log(text);
  for (let i = 0; i < len; ++i) {
    ar.push([]);
    for (let j = 0; j < len; ++j) {
      ar[i][j] = 0;
    }
  }
  messages.innerHTML = "";
  messages.innerHTML += `<div style="margin: 0.8rem;">
  <p>¿Cuantos caminos hay en el grafo?:</p>
  <input type="text" placeholder="graph" class="input-initial" id="valueR1" required>
  ----- path -----
  <input type="text" placeholder="graph" class="input-initial" id="valueR2" required>
  ----- length -----
  <input type="number" placeholder="value" class="input-initial" id="valuePeso" required>
  <button type="" class="btn btn-primary" onclick="generateLink();">Generar Camino</button>
  </div>`;
  console.info("Si se pudo crear el array de valores inicializados en 0");
  console.info(ar);
};

const generateLink = () => {
  let valueR1 = document.getElementById("valueR1").value;
  let valueR2 = document.getElementById("valueR2").value;
  let peso = parseInt(document.getElementById("valuePeso").value);
  let count1 = 0;
  let count2 = 0;
  console.info(text);
  const found1 = text.includes(valueR1);
  if (valueR1 === valueR2) {
    return console.error(
      `Los valores ${valueR1} y ${valueR2} no pueden ser iguales`
    );
  }
  const found2 = text.includes(valueR2);
  if (!found1) {
    return console.error(`El valor de "${valueR1}" no fue establecido`);
  }
  if (!found2) {
    return console.error(`El valor de "${valueR2}" no fue establecido`);
  }
  if (peso < 1) {
    return console.error(`El valor de "${peso}" no es posible`);
  }
  if (grafo[`${valueR1}`]) {
    grafo[`${valueR1}`] = { ...grafo[`${valueR1}`], [`${valueR2}`]: peso };
  } else {
    grafo[`${valueR1}`] = { [`${valueR2}`]: peso };
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
  myDiagram.model = new go.GraphLinksModel(nodeDataAr, linkDataAr);
  console.log("Que rico Grafo 💘🧡💛💚💙💜🤎🖤🤍");
};
