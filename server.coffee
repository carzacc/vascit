'use strict';
http = require 'http'
fs = require 'fs'
util = require 'util'
express = require 'express'
mysql = require 'mysql'
escapeHtml = require './escape'
compression = require 'compression'
helmet = require 'helmet'
start = require './start'
#cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
expressValidator = require 'express-validator'
crypto = require 'crypto'
aiutaci = require './aiutaci'
passport = require 'passport'
bcrypt = require 'bcrypt-nodejs'
LocalStrategy   = require('passport-local').Strategy

navbar = start.header
head = start.head
scripts = start.scripts
adminbar = start.adminbar
adminhead = start.adminhead
connessione = mysql.createConnection process.env.CLEARDB_DATABASE_URL


amministratore = 0
trovato = false

passport.use 'local-login', new LocalStrategy {
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true # allows us to pass back the entire request to the callback
}, (req, username, password, done) ->
    # find a user whose username is the same as the form's username
    # we are checking to see if the user trying to login already exists
    # if there are any errors, return the error before anything else
    connessione.query "SELECT * FROM amministratori",(err,utenti,campi) ->
        if err
            return done(err);
        # if no user is found, return the message
        for i in [0...utenti.length]
          if username==utenti[i].username
            trovato=true
            amministratore=1
            break
        if !trovato
          return done(null, false, req.flash('loginMessage', 'No user found.')); # req.flash is the way to set flashdata using connect-flash

        # if the user is found but the password is wrong
        if utenti[i].password!=password
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); # create the loginMessage and save it to session as flashdata

        # all is well, return successful user
        return done(null, user);


app = express()
app.use helmet()
app.use compression()
app.use bodyParser.json()
app.use bodyParser.urlencoded { extended: false }
app.use expressValidator()
###########################################################################
#app.get '/*', (req, res, next) ->                                       #
# connessione.query "SELECT * FROM SCUOLE", err,scuole,campi ->          #
#   for i in [0...scuole.length]                                         #
#     if scuole[i].nomescuola==req.                                      #
# console.log req.get                                                    #
# next();                                                                #
###########################################################################
app.get '/aiutaci',(req,res) ->
  res.render 'aiutaci.ejs'
  res.end

app.use('/', express.static('public'))


app.post '/aggiungi',(req,res) ->
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



app.get '/aggiungi',(req,res) ->
  req.sanitize('nomescuola').escape()
  req.sanitize('regione').escape()
  req.sanitize('comune').escape()
  req.sanitize('email').escape()

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

app.get '/cerca', (req,res) ->
  scuolacercata = new Array()
  scuolacercata[0] = null
  campo = escapeHtml req.query.scuola
  connessione.query "SELECT * FROM SCUOLE", (err,scuole,campi) ->
    if err
      throw err
    else
      cont=0
      res.writeHead 200, {'Content-Type': 'text/html','title': 'Tutto OK'}
      res.write '<meta charset="utf-8">'
      res.write '<link rel="stylesheet" type="text/css" href="/style/landing.css">'
      dochead = head(campo)
      res.write dochead
      res.write navbar
      for i in [0...scuole.length]
        if scuole[i].nomescuola.toLowerCase().includes(campo.toLowerCase())
          scuolacercata[cont++]=scuole[i]
      if scuolacercata[0]==null
        res.write 'Non è stata trovata alcuna scuola</body>'
      else
        for c in [0...scuolacercata.length]
          res.write '<div class="container"><div class="dati"><h1>'+scuolacercata[c].nomescuola+'</h1>'+
          '<b>Comune: </b>'+scuolacercata[c].comune+'<br>'+
          '<b>Valutazione: </b>'+scuolacercata[c].valutazione+'<br>'+
          '<b>Descrizione: </b>'+scuolacercata[c].descrizione+'<br></div></div>'
  res.write scripts
  res.write '</body>'
  res.end



app.post '/admin',(req,res) ->
  passport.authenticate 'local', {
    successRedirect: '/loggedin',
    failureRedirect: '/admin.html',
    failureFlash: true
  }

app.get '/loggedin',(req,res) ->
  res.render 'admin.ejs'

app.get '/search',(req,res) ->
  scuolagiusta=new Array()
  scuolagiusta[0]=null
  scuolagiustaproposta=new Array()
  scuolagiustaproposta[0]=null
  postodacercare=escapeHtml(req.query.q)
  cont=0
  connessione.query "SELECT * FROM scuole", (err,scuole,campi) ->
    if err
      throw err
    else
      if req.query.regocom=="comune"
        elaboracomune req,res,scuole,scuolagiusta,scuolagiustaproposta,postodacercare
      else if req.query.regocom=="regione"
        elaboraregione req,res,scuole,scuolagiusta,scuolagiustaproposta,postodacercare

elaboracomune =(req,res,scuole,scuolagiusta,scuolagiustaproposta,postodacercare) ->
  cont=0
  for i in [0...scuole.length]
    if(scuole[i].comune.toLowerCase().startsWith(postodacercare.toLowerCase()))
      scuolagiusta[cont++]=scuole[i]
  mostradati res,req,scuolagiusta,scuolagiustaproposta,scuole,postodacercare


elaboraregione =(req,res,scuole,scuolagiusta,scuolagiustaproposta,postodacercare) ->
  cont=0
  for i in[0...scuole.length]
    if scuole[i].regione.toLowerCase()==postodacercare.toLowerCase()
      scuolagiusta[cont++]=scuole[i]
  mostradati res,req,scuolagiusta,scuolagiustaproposta,scuole,postodacercare



mostradati =(res,req,scuolagiusta,scuolagiustaproposta,scuole,postodacercare) ->
  res.writeHead 200, {'Content-Type': 'text/html','title': 'Scuole a '+postodacercare}
  res.write '<meta charset="utf-8">'
  res.write '<link rel="stylesheet" type="text/css" href="/style/landing.css">'
  dochead = head(postodacercare)
  res.write dochead
  res.write navbar
  if(scuolagiusta[0]==null)
    res.end "<h1>Non ci sono scuole nel "+escapeHtml(req.query.regocom)+" "+postodacercare+" oppure "+postodacercare+" non è un "+escapeHtml(req.query.regocom)+ "</h1>"
  else
    res.write "<h1>Scuole trovate:</h1><br>"
    for c in [0...scuolagiusta.length]
      res.write '<div class="container"><div class="dati"><h1>'+scuolagiusta[c].nomescuola+'</h1>'+
      '<b>Comune: </b>'+scuolagiusta[c].comune+'<br>'+
      '<b>Valutazione: </b>'+scuolagiusta[c].valutazione+'<br>'+
      '<b>Descrizione: </b>'+scuolagiusta[c].descrizione+'<br></div></div>'
  res.write scripts
  res.end '</body>'


app.listen process.env.PORT, () ->
  console.log "Avviato server su porta "+process.env.PORT
