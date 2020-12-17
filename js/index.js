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
  if (len > 20) {
    console.error("Lo sentimos no tenemos soporte de más de 20 nodos");
    return (messages.innerHTML = `<h1 style="color: red;">Error el valor ${len} no es válido</h1>
    <p style="color: blue">El valor ${len} es muy grande</p>`);
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
    messages.innerHTML += `<input type="text" class="input-initial" style="font-size: 1.6rem;" id="text${i}" placeholder="name" required>`;
  }
  messages.innerHTML += `<button class="btn btn-success" style="margin-left: 1.0rem; font-size: 2.0rem" onclick="generateArray();">Ingresar Nodos</button>`;
};

const generateArray = () => {
  const messages = document.getElementById("messageGenerate");
  const afterQ = document.getElementById("messages-after");
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
    graph.addNode(text[i]);
  }
  console.log(text);
  messages.innerHTML = "";
  afterQ.innerHTML = `<div><p style="color:black; font-size: 2.4rem; font-weight: bold;" align=center>¿Cuántos caminos hay entre sus nodos?</p></div>`
  messages.innerHTML += `<div>
  <div style="margin: 0.8rem; color: black; font-weight: bold;" class="d-flex justiyfy-content-center">
  <input type="text" placeholder="nodo" class="input-initial" id="valueR1" style="font-size: 1.6rem">
  <p>----- path -----</p>
  
  <input type="text" placeholder="nodo" class="input-initial" id="valueR2" style="font-size: 1.6rem">
  <p>----- length -----</p>
  <input type="number" placeholder="value" class="input-initial" id="valuePeso" style="font-size: 1.6rem">
  <button type="" class="btn btn-primary" onclick="generateLink();" style="margin-left: 1.2%;" >Generar Camino</button>
  </div>`;
};
