const mongoose = require('mongoose');
const TicketSchema = require('../schemas/Ticket.js');

const Ticket = new mongoose.model('Ticket', TicketSchema);

exports.createTickets = function(tickets, eventId) {
  var ticket;
  Object.keys(tickets).forEach(function(key) {
    ticket = new Ticket({
      uuid: tickets[key].uuid,
      event: eventId,
      status: "on sale"
    })
    ticket.save(function(err){
      if(err) console.log(err)
      else console.log("Ticket saved")
    })
  })
  return null;
}

exports.getNumberTicketsSold = async function(eventId) {
  var numberOfSoldTickets = await Ticket.countDocuments({ "event" : eventId, "status" : "sold" });
  return numberOfSoldTickets;
}