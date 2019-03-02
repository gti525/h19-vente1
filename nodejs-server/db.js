const mongoose = require('mongoose');

const PASSWORD = "YEgLGbRpgXefHjvW";
const options = {
  useNewUrlParser: true,
}

let _db;
var mongoDB = `mongodb+srv://admin:${PASSWORD}@cluster-gti525-qlmha.mongodb.net/vente1?retryWrites=true`

function initDb() {
    if(_db) {
        return _db;
    }
    else {
        mongoose.connect(mongoDB, options);
        _db = mongoose.connection;
        _db.once('open', function() {
            console.log("Connected to Database !")
        })
        _db.once('error', function() {
            console.log('Connection error')
        })
        return _db;
    }
}

function getDb() {
    if(!_db) {
        return null;
    }
    else {
        return _db;
    }
}

module.exports = {
    initDb,
    getDb
};