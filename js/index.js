const ar = [];
const text = [];
const nodeDataAr = [];
const linkDataAr = [];

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
      "Error no puede entregar valores menores a 1 para seguir con el programa"
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
    text[i] = document.getElementById(`text${i}`).value;
    graph.addNode(text[i]);
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

