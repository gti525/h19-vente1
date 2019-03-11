const mongoose = require('mongoose');
const TicketSchema = require('../schemas/Ticket.js');

const Ticket = new mongoose.model('Ticket', TicketSchema);

// Application Frontend

// Vérifier si il y a assez de billets d'un événement disponibles pour la commande du client
exports.checkIfTicketsAvailable = async function(event_id, numberOfTickets) {
  var numberOfTicketsAvailable = await Ticket.countDocuments({ event: event_id, status: "on sale" });
  if(numberOfTickets <= numberOfTicketsAvailable) {
    return true;
  } else {
    return false;
  }
}

// Réserver les billets d'un événement
exports.reserveTickets = async function(event_id, numberOfTickets) {
  var tickets = await Ticket.find({ event: event_id, status: "on sale" }).limit(numberOfTickets)
  .populate('event');
  await Object.keys(tickets).forEach(function(key) {
    tickets[key].status = "reserved";
    tickets[key].save(function(err){
      if(err) next(err)
    })
  })
  return tickets;
}

// Replacer les billets en vente
exports.unReserveTickets = async function(tickets) {
  Object.keys(tickets).forEach(async function(key) {
    await Ticket.findOneAndUpdate({ _id: tickets[key]._id, status: "reserved" }, { status: "on sale" }, {new: true});
  })
}

// API

// Ajouter des tickets qui sont liés à un événement
exports.createTickets = async function(tickets, eventId) {
  var ticket;
  await Object.keys(tickets).forEach(function(key) {
    ticket = new Ticket({
      uuid: tickets[key].uuid,
      event: eventId,
      status: "on sale"
    })
    ticket.save(function(err){
      if(err) next(err)
      else console.log("Ticket saved")
    })
  })
  next()
}

// Supprimer tous les billets liés à un événement
exports.deleteTickets = function(next, eventId) {
  Ticket.deleteMany({ event: eventId }, function(err) {
    if(err) next(err)
    else next()
  });
}

// Obtenir tous les billets liés à un événement
exports.getAllTickets = async function(eventId) {
  return await Ticket.find({ event: eventId });
}

// Obtenir le nombre de billets vendus pour un événement
exports.getNumberTicketsSold = async function(eventId) {
  return await Ticket.countDocuments({ "event" : eventId, "status" : "sold" });
}

// Obtenir le nombre de billets non vendus pour un événement
exports.getNumberTicketsAvailable = async function(eventId) {
  return await Ticket.countDocuments({ "event" : eventId, "status" : "on sale" });
}