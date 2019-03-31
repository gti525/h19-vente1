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

// Vérifier que l'événement est encore en vente
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

// Obtenir tous les événements affichés selon la recherche
exports.getSearchedEvents = async function(searchType, searchText) {
    var events = await Event.find({ [searchType]: {$regex: new RegExp(".*"+searchText+".*", "i")} })
    .populate('venue');
    return events;
}

// Vérifier si l'événement a au moins un billet disponible
exports.checkIfSoldOut = async function(event_id) {
    var hasTicketForSale = await Ticket.isOnSaleForEvent(event_id);
    return hasTicketForSale;
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
    var venueId = await Venue.checkIfExists(req.header('adminKey'), body.venue.uuid);
    if(!venueId) {
        var venueId = await Venue.createVenue(req.header('adminKey'), body.venue, next);
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
        status: body.status
    });
    event.save(function(err) {
        if(err) next(err);
        else console.log("Event saved")
    });
    return event._id;
}

// Uploader une image à un événement
exports.uploadImage = async function(eventId, imageUrl) {
    var event = await Event.findOneAndUpdate({ uuid: eventId }, { imageUrl: imageUrl }, {new: true});
    console.log(event)
    return event._id;
}