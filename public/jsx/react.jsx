
/*class homepage extends React.Component {
  render() {
    return (


    );
  }
}*/
ReactDOM.render(
  <div class="homepage">
  <h1><span id="va">VA</span><span id="sc">SC</span><span id="it">IT</span></h1>
  <h3><span id="va">VAlutazione</span> <span id="sc">SCuole</span> <span id="it">ITaliane</span></h3>
  <form method="get" action="/search">
    <b>Cerca scuole per :</b><br />
    Comune<input type="radio" name="regocom" value="comune" checked /><br />
    Regione<input type="radio" name="regocom" value="regione" /><br />
    <input type="text" name="q" /><br />
    <input type="checkbox" name="nonappr" value="nonappr"/> Mostra anche scuole non ancora approvate<br />
    <input type="submit" value="Cerca" />
  </form>
  <div class="footer">
  <a href="nuovascuola.html">Vuoi aggiungere un'altra scuola? Clicca qui</a>
  </div>
</div>
)
