// Generated by CoffeeScript 2.0.1
(function() {
  'use strict';
  var LocalStrategy, MongoClient, adminbar, adminhead, aiutaci, amministratore, app, bcrypt, bodyParser, compression, connessione, cookieParser, crypto, elaboracomune, elaboraregione, escapeHtml, express, expressValidator, flash, fs, head, helmet, http, isLoggedIn, mongo, mongoose, mostradati, mysql, navbar, passport, promise, scripts, session, start, trovato, util;

  http = require('http');

  fs = require('fs');

  util = require('util');

  express = require('express');

  mysql = require('mysql');

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

  connessione = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

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
    var comune, email, errors, nomescuola, regione;
    req.checkBody('nomescuole', 'Nome scuola non valido').isAlpha();
    req.checkBody('regione', 'Nome regione non valido').isAlpha();
    req.checkBody('comune', 'Nome comune non valido').isAlpha();
    req.sanitizeBody('nomescuola').escape();
    req.sanitizeBody('regione').escape();
    req.sanitizeBody('comune').escape();
    req.sanitizeBody('email').escape();
    nomescuola = req.body.nomescuola;
    regione = req.body.regione;
    comune = req.body.comune;
    email = req.body.email;
    errors = req.validationErrors();
    if (errors) {
      return res.write(errors);
    } else {
      return connessione.query("INSERT INTO scuoleproposte (nomescuola,regione,comune,emailproponente)\nVALUES " + "(" + '"' + escapeHtml(req.query.nomescuola) + '"' + "," + '"' + escapeHtml(req.query.regione) + '"' + "," + '"' + escapeHtml(req.query.comune) + '"' + "," + '"' + escapeHtml(req.query.email) + '"' + ");", function(err, righe, campi) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html',
            'title': 'Tutto OK'
          });
          res.write('<link rel="stylesheet" type="text/css" href="/style/index.css">');
          return res.end('<h1>Abbiamo ricevuto la tua richiesta</h1>');
        }
      });
    }
  });

  app.get('/aggiungi', function(req, res) {
    var myobj;
    req.sanitize('nomescuola').escape();
    req.sanitize('regione').escape();
    req.sanitize('comune').escape();
    req.sanitize('email').escape();
    myobj = {
      nomescuola: escapeHtml(req.query.nomescuola),
      regione: escapeHtml(req.query.regione),
      comune: escapeHtml(req.query.comune),
      emailproponente: escapeHtml(req.query.email)
    };
    return MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      return db.collection("scuoleproposte").insertOne(myobj, function(err, res) {
        if (err) {
          throw err;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'title': 'Tutto OK'
        });
        res.write('<link rel="stylesheet" type="text/css" href="/style/index.css">');
        return res.end('<h1>Abbiamo ricevuto la tua richiesta</h1>');
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
        for (i = j = 0, ref = scuole.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          if (scuole[i].nomescuola.toLowerCase().includes(campo.toLowerCase())) {
            scuolacercata[cont++] = scuole[i];
          }
        }
        if (scuolacercata[0] === null) {
          return res.write('Non è stata trovata alcuna scuola</body>');
        } else {
          results = [];
          for (c = k = 0, ref1 = scuolacercata.length; 0 <= ref1 ? k < ref1 : k > ref1; c = 0 <= ref1 ? ++k : --k) {
            results.push(res.write('<a href=/' + scuolagiusta[c].nomescuola + '><div class="container"><div class="dati"><h1>' + scuolagiusta[c].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuolacercata[c].comune + '<br>' + '<b>Valutazione: </b>' + scuolacercata[c].valutazione + '<br>' + '<b>Descrizione: </b>' + scuolacercata[c].descrizione + '<br></div></div>'));
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
    for (i = j = 0, ref = scuole.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (scuole[i].comune.toLowerCase().startsWith(postodacercare.toLowerCase())) {
        scuolagiusta[cont++] = scuole[i];
      }
    }
    return mostradati(res, req, scuolagiusta, scuolagiustaproposta, scuole, postodacercare);
  };

  elaboraregione = function(req, res, scuole, scuolagiusta, scuolagiustaproposta, postodacercare) {
    var cont, i, j, ref;
    cont = 0;
    for (i = j = 0, ref = scuole.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
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
      for (c = j = 0, ref = scuolagiusta.length; 0 <= ref ? j < ref : j > ref; c = 0 <= ref ? ++j : --j) {
        res.write('<a href=/' + scuolagiusta[c].nomescuola + '><div class="container"><div class="dati"><h1>' + scuolagiusta[c].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuolagiusta[c].comune + '<br>' + '<b>Valutazione: </b>' + scuolagiusta[c].valutazione + '<br>' + '<b>Descrizione: </b>' + scuolagiusta[c].descrizione + '<br></div></div>');
      }
    }
    res.write(scripts);
    return res.end('</body>');
  };

  app.get('/logout', function(req, res) {
    req.logout();
    return res.redirect('/');
  });

  app.get('/:url', function(req, res) {
    return MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if (err) {
        throw err;
      }
      return db.collection("scuole").find({}).toArray(function(err, scuole) {
        var dochead, i, j, ref, risultato;
        if (err) {
          throw err;
        }
        risultato = [{}];
        for (i = j = 0, ref = scuole.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          if (scuole[i].nomescuola.startsWith(req.params.url)) {
            risultato[i] = scuole[i];
            break;
          }
        }
        dochead = head(req.params.url);
        res.write(dochead);
        res.write(navbar);
        res.write('<a href=/' + scuole[i].nomescuola + '><div class="container"><div class="dati"><h1>' + scuole[i].nomescuola + '</h1></a>' + '<b>Comune: </b>' + scuole[i].comune + '<br>' + '<b>Valutazione: </b>' + scuole[i].valutazione + '<br>' + '<b>Descrizione: </b>' + scuole[i].descrizione + '<br></div></div>');
        return res.end;
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
