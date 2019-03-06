const express = require('express');
const router = express.Router();

const Event = require('../models/Event.js');
const Ticket = require('../models/Ticket.js');

// Obtenir tous les événements affichés
router.get('/', async function(req, res) {
    var events = await Event.getAllOpenedEvents();
    res.status(200).json({
        message: 'Successfully fetched all events.',
        events
    });
});

// Réserver des billets pour un événement
router.post('/:eventId/reserveTickets', async function(req, res, next) {
    if(!req.body.numberOfTickets || req.body.numberOfTickets > 6) {
        res.status(400).json({ message: `Invalid number of tickets.` });
    }
    var event_id = await Event.checkIfExists(req.body.uuid);
    if(event_id) {
        var isTicketsAvailable = await Ticket.checkIfTicketsAvailable(event_id, req.body.numberOfTickets);
        if(isTicketsAvailable) {
            var tickets = await Ticket.reserveTickets(event_id, req.body.numberOfTickets);
            setTimeout(Ticket.unReserveTickets, 30000, tickets)
            res.status(200).json({
                message: `Successfully reserved ${req.body.numberOfTickets} ticket(s).`,
                tickets
            });
        } else {
            res.status(200).json({ message: `There are not enough tickets available for your order.` });
        }
    } else {
        res.status(400).json({ message: 'No event with this uuid exists.' });
    }
});

module.exports = router;