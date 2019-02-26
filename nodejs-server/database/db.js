var mongoose = require('mongoose');

const PASSWORD = "YEgLGbRpgXefHjvW";
const options = {
  useNewUrlParser: true,
}

var mongoDB = `mongodb+srv://admin:${PASSWORD}@cluster-gti525-qlmha.mongodb.net/vente1?retryWrites=true`
mongoose.connect(mongoDB, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function() {
  console.log("Connected to Database !")
})

module.exports = db;