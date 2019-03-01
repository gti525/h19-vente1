var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');
const router = require('./controllers');

const initDb = require('./db.js').initDb;
const getDb = require('./db.js').getDb;

const port = 4000;

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

initDb();
db = getDb();

app.use('/', router)

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))