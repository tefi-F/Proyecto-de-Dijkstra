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

const generateArray = () => {
  const array = [];
  const messages = document.getElementById("messageGenerate");
  let len = parseInt(document.getElementById("len").value);
  if (len < 1) {
    console.error("Error no puede entregar 0 valores para continuar con el cálculo");
    return messages.innerHTML = `<h1 style="color: red;">Error el valor ${len} no es válido</h1>
    <p style="color: blue">para seguir intente de nuevo</p>`
  }
  for (let i = 0; i < len; ++i) {
    array.push([]);
  }
  for (let i = 0; i < len; ++i) {
    messages.innerHTML += `<input type="text" class="input-initial" id="text${i}" placeholder="name">`
  }
  console.info("Si se pudo crear el array de valores inicializados en 0")
  return array;
};
