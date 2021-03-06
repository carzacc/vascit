// Generated by CoffeeScript 2.2.2
(function() {
  'use strict';
  var LocalStrategy, MongoClient, adminbar, adminhead, aiutaci, amministratore, app, bcrypt, bodyParser, compression, cookieParser, crypto, elaboracomune, elaboraregione, escapeHtml, express, expressValidator, flash, fs, head, helmet, http, isLoggedIn, mongo, mongoose, mostradati, navbar, passport, promise, scripts, session, start, trovato, util;

  http = require('http');

  fs = require('fs');

  util = require('util');

  express = require('express');

  escapeHtml = require('./escape');

  compression = require('compression');

  helmet = require('helmet');

  start = require('./start');

  //cookieParser = require 'cookie-parser'
  bodyParser = require('body-parser');

  cookieParser = require('cookie-parser');

  expressValidator = require('express-validator');

  crypto = require('crypto');

  aiutaci = require('./aiutaci');

  passport = require('passport');

  bcrypt = require('bcrypt-nodejs');

  mongo = require('mongodb');

  LocalStrategy = require('passport-local').Strategy;

  mongoose = require('mongoose');

  flash = require('connect-flash');

  session = require('express-session');

  require('./config/passport')(passport);

  MongoClient = mongo.MongoClient;

  navbar = start.header;

  head = start.head;

  scripts = start.scripts;

  adminbar = start.adminbar;

  adminhead = start.adminhead;

  app = express();

  promise = mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });

  amministratore = 0;

  trovato = false;

  app.use(helmet());

  app.use(compression());

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(expressValidator());

  app.use(cookieParser());

  app.use(session({
    secret: process.env.SECRET
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  app.use(flash());

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {}));

  // find a user whose username is the same as the form's username
  // we are checking to see if the user trying to login already exists
  // if there are any errors, return the error before anything else
  app.get('/', function(req, res) {
    res.render('index.ejs');
    return res.end;
  });

  app.get('/aiutaci', function(req, res) {
    res.render('aiutaci.ejs');
    return res.end;
  });

  app.use('/', express.static('public'));

  app.post('/aggiungi', function(req, res) {
    var comune, email, myobj, nomescuola, regione, response;
    req.checkBody('nome', 'Nome scuola non valido').isAlpha();
    req.checkBody('regione', 'Nome regione non valido').isAlpha();
    req.checkBody('comune', 'Nome comune non valido').isAlpha();
    req.sanitizeBody('nome').escape();
    req.sanitizeBody('regione').escape();
    req.sanitizeBody('comune').escape();
    req.sanitizeBody('email').escape();
    nomescuola = req.body.nome;
    regione = req.body.regione;
    comune = req.body.comune;
    email = req.body.email;
    myobj = {
      nomescuola: escapeHtml(nomescuola),
      regione: escapeHtml(regione),
      comune: escapeHtml(comune),
      emailproponente: escapeHtml(email)
    };
    response = res;
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      db.collection("scuoleproposte").insertOne(myobj, function(err, res) {
        if (err) {
          throw err;
        }
        response.writeHead(200, {
          'Content-Type': 'text/html',
          'title': 'Tutto OK'
        });
        response.write(navbar + '<main role="main" class="container"><div class="starter-template"><br><br><br><br><p class ="lead">');
        return response.end('<h1>Abbiamo ricevuto la tua richiesta</h1></p>' + scripts + '</body>');
      });
    });
  });

  app.get('/cerca', function(req, res) {
    var campo, scuolacercata;
    scuolacercata = new Array();
    scuolacercata[0] = null;
    campo = escapeHtml(req.query.scuola);
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      return db.collection("scuole").find({}).toArray(function(err, scuole) {
        var c, cont, dochead, i, j, k, ref, ref1, results;
        cont = 0;
        res.write('<meta charset="utf-8">');
        res.write('<link rel="stylesheet" type="text/css" href="/style/landing.css">');
        dochead = head(campo);
        res.write(dochead);
        res.write(navbar);
        for (i = j = 0, ref = scuole.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (scuole[i].nomescuola.toLowerCase().includes(campo.toLowerCase())) {
            scuolacercata[cont++] = scuole[i];
          }
        }
        if (scuolacercata[0] === null) {
          return res.write('Non è stata trovata alcuna scuola</body>');
        } else {
          results = [];
          for (c = k = 0, ref1 = scuolacercata.length; (0 <= ref1 ? k < ref1 : k > ref1); c = 0 <= ref1 ? ++k : --k) {
            results.push(res.write('<a href=/' + scuolagiusta[c].idscuola + '><div class="container"><div class="dati"><h1>' + scuolagiusta[c].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuolacercata[c].comune + '<br>' + '<b>Valutazione: </b>' + scuolacercata[c].valutazione + '<br>' + '<b>Descrizione: </b>' + scuolacercata[c].descrizione + '<br></div></div>'));
          }
          return results;
        }
      });
    });
    res.write(scripts);
    res.write('</body>');
    return res.end;
  });

  app.get('/admin.html', function(req, res) {
    return res.render('admin.ejs');
  });

  app.post('/admin', function(req, res) {
    return passport.authenticate('local', {
      successRedirect: '/loggedin',
      failureRedirect: '/admin.html',
      failureFlash: true
    });
  });

  app.get('/loggedin', function(req, res) {
    return res.render('loggedin.ejs', {
      user: req.user
    });
  });

  app.get('/search', function(req, res) {
    var cont, postodacercare, scuolagiusta, scuolagiustaproposta;
    scuolagiusta = new Array();
    scuolagiusta[0] = null;
    scuolagiustaproposta = new Array();
    scuolagiustaproposta[0] = null;
    postodacercare = escapeHtml(req.query.q);
    cont = 0;
    return MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      return db.collection("scuole").find({}).toArray(function(err, scuole) {
        if (req.query.regocom === "comune") {
          return elaboracomune(req, res, scuole, scuolagiusta, scuolagiustaproposta, postodacercare);
        } else if (req.query.regocom === "regione") {
          return elaboraregione(req, res, scuole, scuolagiusta, scuolagiustaproposta, postodacercare);
        }
      });
    });
  });

  elaboracomune = function(req, res, scuole, scuolagiusta, scuolagiustaproposta, postodacercare) {
    var cont, i, j, ref;
    cont = 0;
    for (i = j = 0, ref = scuole.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (scuole[i].comune.toLowerCase().startsWith(postodacercare.toLowerCase())) {
        scuolagiusta[cont++] = scuole[i];
      }
    }
    return mostradati(res, req, scuolagiusta, scuolagiustaproposta, scuole, postodacercare);
  };

  elaboraregione = function(req, res, scuole, scuolagiusta, scuolagiustaproposta, postodacercare) {
    var cont, i, j, ref;
    cont = 0;
    for (i = j = 0, ref = scuole.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (scuole[i].regione.toLowerCase() === postodacercare.toLowerCase()) {
        scuolagiusta[cont++] = scuole[i];
      }
    }
    return mostradati(res, req, scuolagiusta, scuolagiustaproposta, scuole, postodacercare);
  };

  mostradati = function(res, req, scuolagiusta, scuolagiustaproposta, scuole, postodacercare) {
    var c, dochead, j, ref;
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'title': 'Scuole a ' + postodacercare
    });
    res.write('<meta charset="utf-8">');
    res.write('<link rel="stylesheet" type="text/css" href="/style/landing.css">');
    dochead = head(postodacercare);
    res.write(dochead);
    res.write(navbar);
    if (scuolagiusta[0] === null) {
      res.end("<h1>Non ci sono scuole nel " + escapeHtml(req.query.regocom) + " " + postodacercare + " oppure " + postodacercare + " non è un " + escapeHtml(req.query.regocom) + "</h1>");
    } else {
      res.write("<h1>Scuole trovate:</h1><br>");
      for (c = j = 0, ref = scuolagiusta.length; (0 <= ref ? j < ref : j > ref); c = 0 <= ref ? ++j : --j) {
        res.write('<a href=/scuole/' + scuolagiusta[c].idscuola + '><div class="container"><div class="dati"><h1>' + scuolagiusta[c].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuolagiusta[c].comune + '<br>' + '<b>Valutazione: </b>' + scuolagiusta[c].valutazione + '<br>' + '<b>Descrizione: </b>' + scuolagiusta[c].descrizione + '<br></div></div>');
      }
    }
    res.write(scripts);
    return res.end('</body>');
  };

  app.get('/logout', function(req, res) {
    req.logout();
    return res.redirect('/');
  });

  app.get('/scuole/:url', function(req, res) {
    return MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      return db.collection("scuole").find({}).toArray(function(err, scuole) {
        var dochead, i;
        if (err) {
          throw err;
        }
        i = req.params.url;
        if (scuole[i] !== void 0) {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.write('<meta charset="utf-8">');
          res.write('<link rel="stylesheet" type="text/css" href="/style/landing.css">');
          dochead = head(req.params.url);
          res.write(dochead);
          res.write(navbar);
          res.write('<a href=/scuole/' + scuole[i].idscuola + '><div class="container"><div class="dati"><h1>' + scuole[i].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuole[i].comune + '<br>' + '<b>Valutazione: </b>' + scuole[i].valutazione + '<br>' + '<b>Descrizione: </b>' + scuole[i].descrizione + '<br>' + '<a href="/login">Accedi per aggiungere una valutazione</a></div></div>');
          res.write(scripts);
          return res.end('');
        } else {
          res.render('404.ejs');
          console.log(scuole[i]);
          console.log('totale:' + i);
          return console.log(scuole);
        }
      });
    });
  });

  isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  };

  app.listen(process.env.PORT, function() {
    return console.log("Avviato server su porta " + process.env.PORT);
  });

}).call(this);
