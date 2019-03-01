var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');
const router = require('./controllers');

const initDb = require('./db.js').initDb;
const getDb = require('./db.js').getDb;
const Event = require('./models/Event.js');
const Ticket = require('./models/Ticket.js');
const Venue = require('./models/Venue.js');

const port = 4000;

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

initDb();
db = getDb();

app.use('/', router)

/*Ticket.find({ "event" : ObjectId('5c6fa4d03d1ab527ec928af8')}).
populate({
  path: 'event',
  populate:({
    path: 'venue'
  })
}).
exec(function (err, tickets) {
  if(err) console.log(err)
  console.log(tickets[0].event)
})
var venue = new Venue({
  name: "Centre Bell",
  address: "100 Rue Peel",
  capacity: 5,
});

venue.save(function(err) {
  if(err) console.log(err)
  console.log("Venue saved")
  const event = new Event({
    name: "Game Hockey",
    date: "2011-10-05T14:48:00.000Z",
    description: "descr",
    venue: venue._id
  })
  event.save(function(err) {
    if(err) console.log(err)
    console.log("Event saved")
    const ticket = new Ticket({
      uuid: 1234,
      event: event._id
    })
    ticket.save(function(err){
      if(err) console.log(err)
      console.log("Ticket saved")
    })
  })
})*/

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))