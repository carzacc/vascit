'use strict';
http = require 'http'
fs = require 'fs'
util = require 'util'
express = require 'express'
escapeHtml = require './escape'
compression = require 'compression'
helmet = require 'helmet'
start = require './start'
#cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
expressValidator = require 'express-validator'
crypto = require 'crypto'
aiutaci = require './aiutaci'
passport = require 'passport'
bcrypt = require 'bcrypt-nodejs'
mongo = require 'mongodb'
LocalStrategy   = require('passport-local').Strategy
mongoose = require 'mongoose'
flash = require 'connect-flash'
session = require 'express-session'
require('./config/passport')(passport);

MongoClient = mongo.MongoClient
navbar = start.header
head = start.head
scripts = start.scripts
adminbar = start.adminbar
adminhead = start.adminhead
app = express()

promise = mongoose.connect process.env.MONGODB_URI, {useMongoClient: true}


amministratore = 0
trovato = false
app.use helmet()
app.use compression()
app.use bodyParser.json()
app.use bodyParser.urlencoded { extended: false }
app.use expressValidator()

app.use(cookieParser());
app.use(session({ secret: process.env.SECRET }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use 'local-login', new LocalStrategy {
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true # allows us to pass back the entire request to the callback
}, (req, username, password, done) ->
    # find a user whose username is the same as the form's username
    # we are checking to see if the user trying to login already exists
    # if there are any errors, return the error before anything else
app.get '/',(req,res) ->
  res.render 'index.ejs'
  res.end


app.get '/aiutaci',(req,res) ->
  res.render 'aiutaci.ejs'
  res.end

app.use('/', express.static('public'))


app.post '/aggiungi',(req,res) ->
  req.checkBody('nome', 'Nome scuola non valido').isAlpha();
  req.checkBody('regione', 'Nome regione non valido').isAlpha();
  req.checkBody('comune', 'Nome comune non valido').isAlpha();
  req.sanitizeBody('nome').escape()
  req.sanitizeBody('regione').escape()
  req.sanitizeBody('comune').escape()
  req.sanitizeBody('email').escape()
  nomescuola = req.body.nome
  regione = req.body.regione
  comune = req.body.comune
  email = req.body.email
  myobj = {nomescuola: escapeHtml(nomescuola), regione: escapeHtml(regione), comune: escapeHtml(comune), emailproponente: escapeHtml(email)}
  response = res
  MongoClient.connect process.env.MONGODB_URI, (err,db) ->
    if err
      throw err
    db.collection("scuoleproposte").insertOne myobj,(err,res) ->
      if err
        throw err
      response.writeHead 200, {'Content-Type': 'text/html','title': 'Tutto OK'}
      response.write navbar+'<main role="main" class="container"><div class="starter-template"><br><br><br><br><p class ="lead">'
      response.end '<h1>Abbiamo ricevuto la tua richiesta</h1></p>'+scripts+'</body>'
    return
  return

app.get '/cerca', (req,res) ->
  scuolacercata = new Array()
  scuolacercata[0] = null
  campo = escapeHtml req.query.scuola
  MongoClient.connect process.env.MONGODB_URI, (err,db) ->
    if err
      throw err
    db.collection("scuole").find({}).toArray (err,scuole) ->
      cont=0
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
          res.write '<a href=/'+scuolagiusta[c].idscuola+'><div class="container"><div class="dati"><h1>'+scuolagiusta[c].nomescuola+'</h1></a>'+
          '<b>Comune: </b>'+scuolacercata[c].comune+'<br>'+
          '<b>Valutazione: </b>'+scuolacercata[c].valutazione+'<br>'+
          '<b>Descrizione: </b>'+scuolacercata[c].descrizione+'<br></div></div>'
  res.write scripts
  res.write '</body>'
  res.end

app.get '/admin.html' ,(req,res) ->
  res.render 'admin.ejs'

app.post '/admin',(req,res) ->
  passport.authenticate 'local', {
    successRedirect: '/loggedin',
    failureRedirect: '/admin.html',
    failureFlash: true
  }

app.get '/loggedin',(req,res) ->
  res.render 'loggedin.ejs', {
    user : req.user
  }

app.get '/search',(req,res) ->
  scuolagiusta=new Array()
  scuolagiusta[0]=null
  scuolagiustaproposta=new Array()
  scuolagiustaproposta[0]=null
  postodacercare=escapeHtml(req.query.q)
  cont=0
  MongoClient.connect process.env.MONGODB_URI, (err,db) ->
    if err
      throw err
    db.collection("scuole").find({}).toArray (err,scuole) ->
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
      res.write '<a href=/scuole/'+scuolagiusta[c].idscuola+'><div class="container"><div class="dati"><h1>'+scuolagiusta[c].nomescuola+'</h1></a>'+
      '<b>Comune: </b>'+scuolagiusta[c].comune+'<br>'+
      '<b>Valutazione: </b>'+scuolagiusta[c].valutazione+'<br>'+
      '<b>Descrizione: </b>'+scuolagiusta[c].descrizione+'<br></div></div>'
  res.write scripts
  res.end '</body>'

app.get '/logout',(req, res) ->
  req.logout()
  res.redirect '/'

app.get '/scuole/:url', (req,res) ->
  MongoClient.connect process.env.MONGODB_URI,(err,db) ->
    if err
      throw err
    db.collection("scuole").find({}).toArray (err,scuole)  ->
      if err
        throw err
      i=req.params.url
      if scuole[i] != undefined
        res.writeHead 200, {'Content-Type': 'text/html'}
        res.write '<meta charset="utf-8">'
        res.write '<link rel="stylesheet" type="text/css" href="/style/landing.css">'
        dochead = head req.params.url
        res.write dochead
        res.write navbar
        res.write '<a href=/scuole/'+scuole[i].idscuola+'><div class="container"><div class="dati"><h1>'+scuole[i].nomescuola+'</h1></a>'+
        '<b>Comune: </b>'+scuole[i].comune+'<br>'+
        '<b>Valutazione: </b>'+scuole[i].valutazione+'<br>'+
        '<b>Descrizione: </b>'+scuole[i].descrizione+'<br>'+
        '<a href="/login">Accedi per aggiungere una valutazione</a></div></div>'
        res.write scripts
        res.end ''
      else
        res.render '404.ejs'
        console.log scuole[i]
        console.log 'totale:'+i
        console.log scuole


isLoggedIn=(req, res, next) ->
    if req.isAuthenticated()
        return next()
    res.redirect '/'



app.listen process.env.PORT, () ->
  console.log "Avviato server su porta "+process.env.PORT
