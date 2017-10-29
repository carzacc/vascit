module.exports.header =     `<body><nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">Vascit</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/admin.html">Admin <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/aiutaci">Proposta scuole</a>
          </li>
          <li class="nav-item">
            <!--a class="nav-link disabled" href="#">Disabled</a-->
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://vascit.carzacc.info" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sito vecchio</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="/home.html">Home(ricerca scuole)</a>
              <a class="dropdown-item" href="/nuovascuola.html">Aggiunta scuole</a>
              <!--a class="dropdown-item" href="#">Something else here</a-->
            </div>

          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" method="get" action="/cerca">
          <input class="form-control mr-sm-2" type="text" name="scuola" placeholder="Cerca scuole per nome" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>`
module.exports.head = function(valore)  {
  let datornare=  ` <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Valutazione scuole italiane">
  <meta name="author" content="Carzacc">
  <title>${valore} - Ricerca con Vascit</title>
  `;
  return datornare
}

module.exports.adminhead = ` <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Valutazione scuole italiane">
  <meta name="author" content="Carzacc">
  <title>Pannello admin Vascit</title>
  `


module.exports.scripts = `<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
`
module.exports.adminbar = `<body>
<nav class="navbar navbar-expand-md fixed-top">
      <a class="navbar-brand" href="/admin.html">Pannello Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Torna alla Home <span class="sr-only">(current)</span></a>
          </li>
          <!--li class="nav-item">
            <a class="nav-link" href="/aiutaci">Proposta scuole</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://vascit.carzacc.info" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sito vecchio</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="/home.html">Home(ricerca scuole)</a>
              <a class="dropdown-item" href="/nuovascuola.html">Aggiunta scuole</a>
              <a class="dropdown-item" href="#">Something else here</a-->
            </div>

          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" method="get" action="/cerca">
          <input class="form-control mr-sm-2" type="text" name="scuola" placeholder="Cerca scuole per nome" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
`
