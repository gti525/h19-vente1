const mongoose = require('mongoose');
const EventSchema = require('../schemas/Event.js');
const Venue = require('../models/Venue.js');
const Ticket = require('../models/Ticket.js');

const Event = new mongoose.model('Event', EventSchema);

exports.checkIfExists = async function(eventId) {
    var event = await Event.findOne({ "uuid" : eventId })
    if(event) return event._id;
    else return false;
}

exports.createEvent = async function(body) {
    var venueId = await Venue.checkIfExists(body.venue.name);
    if(!venueId) var venueId = await Venue.createVenue(body.venue);

    var eventId = await this.saveEvent(body, venueId);

    Ticket.createTickets(body.tickets, eventId);
    
    return null;
}

exports.updateEvent = async function(eventId, body) {
    var currentEvent = await Event.findOneAndUpdate({ uuid: eventId }, body, {new: true});
    return null;
}

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
        if(err) console.log(err);
    });
    return event._id;
}