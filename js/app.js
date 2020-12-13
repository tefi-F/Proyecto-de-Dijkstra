document.addEventListener("DOMContentLoaded", () => {
  var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),
    layout: {
      name: "avsdf",
      nodeSeparation: 120,
    },
    style: [
      {
        selector: "node",
        style: {
          label: "data(id)",
          "text-valign": "center",
          color: "#000000",
          "background-color": "#3a7ecf",
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#3a7ecf",
          opacity: 0.5,
        },
      },
    ],
    elements: {
      nodes: [
        { data: { id: "v1", weight: 1 } },
        { data: { id: "v2", weight: 2 } },
        { data: { id: "v3", weight: 3 } },
        { data: { id: "v4", weight: 4 } },
        { data: { id: "v5", weight: 5 } },
        { data: { id: "v6", weight: 6 } },
        { data: { id: "v7", weight: 7 } },
      ],
      edges: [
        { data: { source: "v1", target: "v2", directed: "false" } },
        { data: { source: "v1", target: "v4", directed: "false" } },
        { data: { source: "v1", target: "v5", directed: "false" } },
        { data: { source: "v2", target: "v4", directed: "false" } },
        { data: { source: "v2", target: "v6", directed: "false" } },
        { data: { source: "v3", target: "v4", directed: "false" } },
        { data: { source: "v3", target: "v7", directed: "false" } },
        { data: { source: "v4", target: "v5", directed: "false" } },
        { data: { source: "v4", target: "v7", directed: "false" } },
        { data: { source: "v5", target: "v6", directed: "false" } },
        { data: { source: "v6", target: "v7", directed: "false" } },
        { data: { source: "v6", target: "v3", directed: "false" } },
      ],
    },
  }));
  document.getElementById("layoutButton").addEventListener("click", () => {
    if (document.getElementById("end").checked) {
      var layout = cy.layout({
        name: "avsdf",
        animate: "end",
        animationDuration: 1000,
        animationEasing: "ease-in-out",
        nodeSeparation: 120,
      });
    } else {
      var layout = cy.layout({
        name: "avsdf",
        refresh: 1,
        animate: "during",
        animationDuration: 1000,
        animationEasing: "ease-in-out",
        nodeSeparation: 120,
      });
    }
    layout.run();
  });
  document.getElementById("randomize").addEventListener("click", () => {
    cy.nodes().forEach((el) => {
      el.data().weight = Math.floor(Math.random() * 10 + 1);
    });
    var layout = cy.layout({
      name: "circle",
      animate: true,
      sort: (a, b) => {
        return a.data("weight") - b.data("weight");
      },
      radius: 120,
      animationDuration: 1000,
      animationEasing: "ease-in-out",
    });
    layout.run();
  });
});