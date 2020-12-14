// Esta función inicializa el canvas al entrar a la pagina
const generateGraphInitial = () => {
  if (window.goSamples) goSamples();
  let $ = go.GraphObject.make;
  myDiagram = $(go.Diagram, "myDiagramDiv", {
    initialAutoScale: go.Diagram.Uniform,
    contentAlignment: go.Spot.Center,
    layout: $(go.ForceDirectedLayout, {
      defaultSpringLength: 10,
      maxIterations: 300,
    }),
    maxSelectionCount: 2,
  });
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Circle", {
      fill: go.Brush.randomColor(128),
      strokeWidth: 3,
      desiredSize: new go.Size(50, 50),
    }),
    $(go.TextBlock, { margin: 5 }, new go.Binding("text", "key"))
  );
  myDiagram.linkTemplate = $(
    go.Link, // the whole link panel
    {
      selectable: false,
      curve: go.Link.Bezier,
      layerName: "Background",
    },
    $(go.Shape, { toArrow: "Standard", strokeWidth: 4 }),
    $(go.TextBlock, new go.Binding("text", "text"), {
      segmentOffset: new go.Point(NaN, NaN),
      segmentOrientation: go.Link.OrientUpright,
    })
  );
  myDiagram.toolManager.clickSelectingTool.standardMouseSelect = function () {
    let diagram = this.diagram;
    if (diagram === null || !diagram.allowSelect) return;
    let e = diagram.lastInput;
    let count = diagram.selection.count;
    let curobj = diagram.findPartAt(e.documentPoint, false);
    if (curobj !== null) {
      if (count < 2) {
        // add the part to the selection
        if (!curobj.isSelected) {
          let part = curobj;
          if (part !== null) part.isSelected = true;
        }
      } else {
        if (!curobj.isSelected) {
          let part = curobj;
          if (part !== null) diagram.select(part);
        }
      }
    } else if (e.left && !(e.control || e.meta) && !e.shift) {
      // left click on background with no modifier: clear selection
      diagram.clearSelection();
    }
  };
  generateGraphAleatory();
};

// Función que genera aleatoreamente más grafos con la misma base de los nodos
const generateGraphAleatory = () => {
  const names = [
    "Joan",
    "Piero",
    "Estefany",
    "Samuel",
    "Nicol",
    "Regulus",
    "Nasa",
    "Reinhard",
    "Rem",
    "Ram",
    "Asuna",
    "Mochi",
  ];
  const nodeDataArray = [];
  for (let i = 0; i < names.length; i++) {
    nodeDataArray.push({
      key: names[i],
      text: names[i],
      color: go.Brush.randomColor(128, 240),
    });
  }
  const linkDataArray = [];
  let num = nodeDataArray.length;
  for (let i = 0; i < num * 2; i++) {
    let a = Math.floor(i / 2);
    let b = Math.floor((Math.random() * num) / 4) + 1;
    linkDataArray.push({
      from: names[i],
      to: names[a | b] === names[i] ? names[i + 2] : names[a | b],
      text: Math.floor((Math.random() * num) / 2) + 1,
      color: go.Brush.randomColor(0, 127),
    });
  }
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  console.log("Que rico Grafo ❤🧡💛💚💙💜🤎🖤🤍");
};
