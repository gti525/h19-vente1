var mongoose = require('mongoose');
const TicketSchema = require('../schemas/Ticket.js');

var Ticket = new mongoose.model('Ticket', TicketSchema);

exports.addTicket = function(eventId, uuid) {
    const ticket = new Ticket({
        uuid: uuid,
        event: eventId
      })
      ticket.save(function(err){
        if(err) console.log(err)
        else console.log("Ticket saved")
      })
    return null
}