const mongoose = require('mongoose');
const EventSchema = require('../schemas/Event.js');
const Venue = require('../models/Venue.js');
const Ticket = require('../models/Ticket.js');

const Event = new mongoose.model('Event', EventSchema);

// Application Frontend

// Détermine si un événement de la BD possède ce id
exports.checkIfExists = async function(eventId) {
    var event = await Event.findById(eventId)
    if(event) return event._id;
    else return false;
}

exports.checkIfOpened = async function(event_id) {
    var event = await Event.findOne({ "_id": event_id, "status": "opened" });
    if(event) return event._id;
    else return false;
}

// Obtenir tous les événements affichés
exports.getAllOpenedEvents = async function() {
    var events = await Event.find({ status: "opened" })
    .populate('venue');
    return events;
}


// API

// Détermine si un événement de la BD possède ce uuid
exports.checkIfExistsForApi = async function(eventId) {
    var event = await Event.findOne({ "uuid" : eventId })
    if(event) return event._id;
    else return false;
}

// Crée un nouvel événement avec ses billets
exports.createEvent = async function(req, next) {
    const { body } = req;
    var venueId = await Venue.checkIfExists(req.header('adminKey'), body.venue.name);
    if(!venueId) {
        var venueId = await Venue.createVenue(body.venue, next);
    }

    var eventId = await this.saveEvent(req, venueId, next);

    Ticket.createTickets(body.tickets, eventId, next);
    
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
exports.checkIfOpenedForApi = async function(eventId) {
    var eventOpened = await Event.findOne({ uuid: eventId, status: "opened" });
    return eventOpened;
}

// Détermine si l'événement n'est plus en vente
exports.endEvent = async function(eventId) {
    var event = await Event.findOneAndUpdate({ uuid: eventId }, { status: "ended" }, {new: true});
    return event._id;
}

// Sauvegarde l'événement dans la BD
exports.saveEvent = function(req, venueId, next) {
    const { body } = req;
    const event = new Event({
        adminId: req.header('adminKey'),
        uuid: body.uuid,
        title: body.title,
        artist: body.artist,
        date: body.date,
        description: body.description,
        price: body.price,
        venue: venueId,
        status: "opened"
    });
    event.save(function(err) {
        if(err) next(err);
        else console.log("Event saved")
    });
    return event._id;
}