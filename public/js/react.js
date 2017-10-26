
/*class homepage extends React.Component {
  render() {
    return (


    );
  }
}*/
ReactDOM.render(React.createElement(
  "div",
  { "class": "homepage" },
  React.createElement(
    "h1",
    null,
    React.createElement(
      "span",
      { id: "va" },
      "VA"
    ),
    React.createElement(
      "span",
      { id: "sc" },
      "SC"
    ),
    React.createElement(
      "span",
      { id: "it" },
      "IT"
    )
  ),
  React.createElement(
    "h3",
    null,
    React.createElement(
      "span",
      { id: "va" },
      "VAlutazione"
    ),
    " ",
    React.createElement(
      "span",
      { id: "sc" },
      "SCuole"
    ),
    " ",
    React.createElement(
      "span",
      { id: "it" },
      "ITaliane"
    )
  ),
  React.createElement(
    "form",
    { method: "get", action: "/search" },
    React.createElement(
      "b",
      null,
      "Cerca scuole per :"
    ),
    React.createElement("br", null),
    "Comune",
    React.createElement("input", { type: "radio", name: "regocom", value: "comune", checked: true }),
    React.createElement("br", null),
    "Regione",
    React.createElement("input", { type: "radio", name: "regocom", value: "regione" }),
    React.createElement("br", null),
    React.createElement("input", { type: "text", name: "q" }),
    React.createElement("br", null),
    React.createElement("input", { type: "checkbox", name: "nonappr", value: "nonappr" }),
    " Mostra anche scuole non ancora approvate",
    React.createElement("br", null),
    React.createElement("input", { type: "submit", value: "Cerca" })
  ),
  React.createElement(
    "div",
    { "class": "footer" },
    React.createElement(
      "a",
      { href: "nuovascuola.html" },
      "Vuoi aggiungere un'altra scuola? Clicca qui"
    )
  )
));
