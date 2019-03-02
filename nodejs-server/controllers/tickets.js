var express = require('express');
var router = express.Router({mergeParams: true});
const auth = require('../middlewares/auth.js');
var Ticket = require('../models/Ticket.js');
var Event = require('../models/Event.js');

router.post('/', auth.isAdmin, async function(req, res) {
    var event_id = await Event.checkIfExists(req.params.eventId);
    Ticket.createTickets(req.body, event_id);
    res.status(200).json({ message: 'In Ticket controller!' });
})

router.get('/', auth.isAdmin, async function(req, res) {
    var event_id = await Event.checkIfExists(req.params.eventId);
    if(event_id) {
        var numberOfTicketsSold = await Ticket.getNumberTicketsSold(event_id);
        var numberOfTicketsAvailable = await Ticket.getNumberTicketsAvailable(event_id);
        res.status(200).json({
            message: 'Successfully fetched the number of sold and available tickets for this event.',
            numberOfTicketsSold,
            numberOfTicketsAvailable
        });
    } else {
        res.status(400).json({ message: 'No event with this id exists' });
    }
})

module.exports = router;