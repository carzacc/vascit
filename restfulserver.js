'use strict';

var http = require('http');
var fs = require('fs');
var util = require('util');
var express = require('express');
var mysql = require('mysql');
var escapeHtml = require('./escape');
var compression = require('compression');
var helmet = require('helmet');
var start = require('./start');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var aggiungiscuole = require('./postproposta')

var navbar = start.header;
var head = start.head;
var scripts = start.scripts;
var connessione = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
var app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.post('/aggiungi',function(req,res) {
  aggiungiscuole(req,res,connessione,escapeHtml);
})
