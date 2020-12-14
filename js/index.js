const ar = [];
const text = [];

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
  console.log("Tobo bn ❤");
};

const generarNames = () => {
  const messages = document.getElementById("messageGenerate");
  let len = parseInt(document.getElementById("len").value);
  for (let i = 0; i < len; ++i) {
    messages.innerHTML += `<input type="text" class="input-initial" id="text${i}" placeholder="name">`;
  }
  messages.innerHTML += `<button class="btn btn-success" onclick="generateArray();">Ingresar Nodos</button>`
}

const generateArray = () => {
  const messages = document.getElementById("messageGenerate");
  let len = parseInt(document.getElementById("len").value);
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
    text[i] = document.getElementById(`text${i}`).value;
  }
  console.log(text);
  for (let i = 0; i < len; ++i) {
    ar.push([]);
    for (let j = 0; j < len; ++j) {
      ar[i][j] = 0;
    }
  }
  messages.innerHTML += `<div style="margin: 0.8rem;">
  <p>¿Cuantos caminos hay en el grafo?:</p>
  <input type="text" placeholder="graph" class="input-initial" id="valueR1">
  ----- path -----
  <input type="text" placeholder="graph" class="input-initial" id="valueR2">
  <button type="" class="btn btn-primary" onclick="generarGraph();">Generar Camino</button>
  </div>`;
  console.info("Si se pudo crear el array de valores inicializados en 0");
  console.info(ar);
};

const generarGraph = () => {
  let valueR1 = document.getElementById("valueR1").value;
  let valueR2 = document.getElementById("valueR2").value;
  const found1 = text.includes(valueR1);
  const found2 = text.includes(valueR2);
  if (found1) {
    return console.error(`El valor de "${valueR1}" no fue establecido`);
  }
  if (found2) {
    return console.error(`El valor de "${valueR2}" no fue establecido`);
  }
  console.log(found1, found2);
}
