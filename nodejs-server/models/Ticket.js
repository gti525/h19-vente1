var mongoose = require('mongoose');
const TicketSchema = require('../schemas/Ticket.js');

module.exports = new mongoose.model('Ticket', TicketSchema);