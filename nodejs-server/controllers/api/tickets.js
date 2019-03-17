const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('../../middlewares/auth.js');
var Ticket = require('../../models/Ticket.js');
var Event = require('../../models/Event.js');

// Ajouter des billets à un événement déjà existant
router.post('/', auth.isAdmin, async function(req, res) {
    var event_id = await Event.checkIfExistsForApi(req.params.eventId);
    Ticket.createTickets(req.body, event_id);
    res.status(200).json({ message: 'Successfully added tickets to the event.' });
});

// Obtenir le nombre de billets vendus et non vendus/réservés d'un événement
router.get('/', auth.isAdmin, async function(req, res) {
    var event_id = await Event.checkIfExistsForApi(req.params.eventId);
    if(event_id) {
        var numberOfTicketsSold = await Ticket.getNumberTicketsSold(event_id);
        var numberOfTicketsAvailable = await Ticket.getNumberTicketsAvailable(event_id);
        res.status(200).json({
            message: 'Successfully fetched the number of sold and available tickets for this event.',
            numberOfTicketsSold,
            numberOfTicketsAvailable
        });
    } else {
        res.status(400).json({ message: 'No event with this uuid exists' });
    }
});

module.exports = router;