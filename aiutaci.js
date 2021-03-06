module.exports = `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Valutazione scuole italiane">
    <meta name="author" content="Carzacc">
    <title>Form aggiunta scuole</title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="./style/landing.css" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108378671-1"></script>
    <script src="./gtag.js"></script>
  </head>
  <body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Vascit</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Ar <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/aiutaci.html">Proposta scuole(ancora non convertito)</a>
          </li>
          <li class="nav-item">
            <!--a class="nav-link disabled" href="#">Disabled</a-->
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sito vecchio</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Vascit</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Ar <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/aiutaci.html">Proposta scuole(ancora non convertito)</a>
          </li>
          <li class="nav-item">
            <!--a class="nav-link disabled" href="#">Disabled</a-->
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sito vecchio</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="/home.html">Home(ricerca scuole)</a>
              <a class="dropdown-item" href="/nuovascuola.html">Aggiunta scuole</a>
              <!--a class="dropdown-item" href="#">Something else here</a-->
            </div>

          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" action="/cerca" method="get">
          <input name="scuola" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <main role="main" class="container">
      <div class="starter-template">
        <h1>VASCIT</h1>
        <p class="lead">Un motore di ricerca e raccolta di valutazioni per scuole.</p>
      </div>
      <div class="form ricerca scuole">
        <label>Cerca scuole per</label>
        <form method="get" action="/search">
            <label class="radio-inline">Comune<input type="radio" class="form-control" name="regocom" value="comune" checked></label>
            <label class="radio-inline">Regione<input type="radio" class="form-control" name="regocom" value="regione"></label>
          <div class="form-group">
            <label for="text">Nome Comune/Regione da cercare </label>
            <input type="text" name="q"><br>
          </div>
       <!--div class="checkbox">
         <label><input type="checkbox" name="nonappr" value="nonappr"></label>
       </div-->
       <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>
    </main><!-- /.container -->
    <!-- Bootstrap core JavaScript-->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
  </body>
</html>
`
