# corpo richiesta HTTP per aggiungere scuole:
# nomescuola= nome della scuola da aggiungere
# regione = nome regione da aggiungere
# comune = nome comune da aggiungere
# email = email del proponente (aiuta nel processo di verifica)
#
#
#
#
#


module.exports = (req,res,connessione,escapeHtml) ->
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
    res.send "c'è stato l'errore"+errors
    return 1
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
        res.writeHead 200, {'Content-Type': 'text/plain','title': 'Tutto OK'}
        res.write 'Abbiamo ricevuto la tua richiesta'
        res.end
      return 0
