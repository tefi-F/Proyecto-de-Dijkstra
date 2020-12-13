


const dijkstra = (array=undefined) => {
    if (array === undefined) {
    return console.error("Error no mando ningun array");
    }
    if (!(array instanceof Array)) {
    return console.error(`El valor ${array} no es un arreglo`);
    }
    for (let value of array) {
    if (typeof value !== "number" || value > 1 || value < 0) {
    return console.error(`El valor ${value} no es un numero o no esta en el rango de valores validos`);
    }
    }
    console.log("Tobo bn ❤");
    }
    
    dijkstra();
    dijkstra(true);
    dijkstra(["1", "1", "0"]);
    dijkstra([0, 1, 2])
    dijkstra([0, 1, 0])