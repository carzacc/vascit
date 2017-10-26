module.exports = (req,res,connessione,escapeHtml)
  req.checkBody('nomescuole', 'Nome scuola non valido').isAlpha();
  req.checkBody('regione', 'Nome regione non valido').isAlpha();
  req.checkBody('comune', 'Nome comune non valido').isAlpha();
  req.sanitizeBody('nomescuola').escape()
  req.sanitizeBody('regione').escape()
  req.sanitizeBody('comune').escape()
  req.sanitizeBody('email').escape()
  nomescuola = req.body.nomescuola
  regione = req.body.regione
  comune = req.body.comune
  email = req.body.email
  errors = req.validationErrors()
  if errors
    res.write errors
  else
    connessione.query "INSERT INTO scuoleproposte (nomescuola,regione,comune,emailproponente)\nVALUES "+
    "("+
    '"'+escapeHtml(req.query.nomescuola)+'"'+
    ","+
    '"'+escapeHtml(req.query.regione)+'"'+
    ","+
    '"'+escapeHtml(req.query.comune)+'"'+
    ","+
    '"'+escapeHtml(req.query.email)+'"'+
    ");",(err,righe,campi) ->
      if err
        throw err
      else
        res.writeHead 200, {'Content-Type': 'text/html','title': 'Tutto OK'}
        res.write '<link rel="stylesheet" type="text/css" href="/style/index.css">'
        res.end '<h1>Abbiamo ricevuto la tua richiesta</h1>'
