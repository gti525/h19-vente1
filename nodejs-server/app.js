const express = require('express')
const bodyParser = require('body-parser');
const router = require('./controllers');

const initDb = require('./db.js').initDb;
const getDb = require('./db.js').getDb;

const port = 4000;

// Initialise l'app
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Initialise et obtient la connection avec la BD
initDb();
db = getDb();

// Initialise le routeur
app.use('/', router)

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))