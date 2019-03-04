const mongoose = require('mongoose');
const EventSchema = require('../schemas/Event.js');
const Venue = require('../models/Venue.js');
const Ticket = require('../models/Ticket.js');

const Event = new mongoose.model('Event', EventSchema);

// Application Frontend

// Obtenir tous les événements affichés
exports.getAllOpenedEvents = async function() {
    var events = await Event.find({ status: "opened" })
    .populate('venue');
    return events;
}


// API

// Détermine si un événement de la BD possède ce uuid
exports.checkIfExists = async function(eventId) {
    var event = await Event.findOne({ "uuid" : eventId })
    if(event) return event._id;
    else return false;
}

// Crée un nouvel événement avec ses billets
exports.createEvent = async function(body) {
    var venueId = await Venue.checkIfExists(body.venue.name);
    if(!venueId) {
        var venueId = await Venue.createVenue(body.venue);
    }

    var eventId = await this.saveEvent(body, venueId);

    Ticket.createTickets(body.tickets, eventId);
    
    return null;
}

// Met à jour les informations d'un événement
exports.updateEvent = async function(eventId, body) {
    await Event.findOneAndUpdate({ uuid: eventId }, body, {new: true});
    return null;
}

// Supprime un événement
exports.deleteEvent = async function(eventId) {
    var event = await Event.findOne({ uuid: eventId });
    event.remove(Ticket, function(err, event) {
        if(err) console.log("Remove Err " + err)
        else console.log("Successss")
    })
    return null;
}

// Détermine si l'événement est en vente
exports.checkIfOpened = async function(eventId) {
    var eventOpened = await Event.findOne({ uuid: eventId, status: "opened" });
    return eventOpened;
}

// Détermine si l'événement n'est plus en vente
exports.endEvent = async function(eventId) {
    var event = await Event.findOneAndUpdate({ uuid: eventId }, { status: "ended" }, {new: true});
    return event._id;
}

// Sauvegarde l'événement dans la BD
exports.saveEvent = function(body, venueId) {
    const event = new Event({
        uuid: body.uuid,
        title: body.title,
        artist: body.artist,
        date: body.date,
        description: body.description,
        venue: venueId,
        status: "opened"
    });
    event.save(function(err) {
        if(err) next(err);
        else console.log("Event saved")
    });
    return event._id;
}