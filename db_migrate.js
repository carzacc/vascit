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

expressValidator = require('express-validator');

crypto = require('crypto');

aiutaci = require('./aiutaci');

passport = require('passport');

bcrypt = require('bcrypt-nodejs');

mongo = require('mongodb');

LocalStrategy = require('passport-local').Strategy;

MongoClient = mongo.MongoClient;

navbar = start.header;

head = start.head;

scripts = start.scripts;

adminbar = start.adminbar;

adminhead = start.adminhead;

connessione = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

amministratore = 0;

trovato = false;

url = process.env.MONGODB_URI

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("scuole").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
