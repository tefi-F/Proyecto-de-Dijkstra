// Esta función inicializa el canvas al entrar a la página web
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
    {
      selectionAdorned: false,
      selectionChanged: nodeSelectionChanged,
    },
    new go.Binding("location", "loc", go.Point.parse),
    $(
      go.Shape,
      "Circle",
      {
        name: "Nodo",
        fill: go.Brush.randomColor(128),
        strokeWidth: 4,
        desiredSize: new go.Size(75, 75),
      },
      new go.Binding("fill", "isSelected", (s, obj) => {
        return s ? "red" : obj.part.data.color;
      }).ofObject()
    ),
    $(go.TextBlock, { margin: 5 }, new go.Binding("text", "key"))
  );
  myDiagram.linkTemplate = $(
    go.Link,
    $(
      go.Shape,
      {
        name: "PathShort",
        toArrow: "Standard",
        strokeWidth: 4,
      },
      new go.Binding("stroke", "isHighlighted", (h) => {
        return h ? "red" : "black";
      }).ofObject()
    ),
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
};
