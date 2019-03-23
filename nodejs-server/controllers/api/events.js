const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.js');
const Event = require('../../models/Event.js');
const Ticket = require('../../models/Ticket.js');

// Ajouter un événement
router.post('/', auth.isAdmin, async function(req, res, next) {
    var eventExists = await Event.checkIfExistsForApi(req.body.uuid);
    if(!eventExists) {
        Event.createEvent(req, next);
        res.status(200).json({ message: 'Successfully added an event.' });
    } else {
        res.status(400).json({ message: 'An event with this uuid already exists.' });
    }
});

// Modifier un événement
router.put('/:eventId', auth.isAdmin, async function(req, res) {
    var event_id = await Event.checkIfExistsForApi(req.params.eventId);
    if(event_id) {
        var noTicketSold = await Ticket.checkIfTicketSoldForEvent(event_id);
        if(noTicketSold) {
            Event.updateEvent(req.params.eventId, req.body);
            res.status(200).json({ message: 'Successfully updated the event.' });
        } else {
            res.status(400).json({ message: 'Cannot update an event with tickets already sold.' })
        }
    } else {
        res.status(400).json({ message: 'No event with this uuid exists.' });
    }
});

// Finir la vente d'un événement
router.post('/:eventId/endEvent', auth.isAdmin, async function(req, res) {
    var eventOpened = await Event.checkIfOpenedForApi(req.params.eventId);
    if(eventOpened) {
        var event_id = await Event.endEvent(req.params.eventId);
        var tickets = await Ticket.getAllTicketsToReturn(event_id);
        res.status(200).json({
            message: 'Successfully ended the sale of the event.',
            tickets
        });
    } else {
        res.status(400).json({
            message: 'There is no active events with that uuid.'
        });
    }
    
});

// Supprimer un événement
router.delete('/:eventId', auth.isAdmin, async function(req, res) {
    var eventExists = await Event.checkIfExistsForApi(req.params.eventId);
    if(eventExists) {
        Event.deleteEvent(req.params.eventId);
        res.status(200).json({ message: 'Successfully deleted the event.' });
    } else {
        res.status(400).json({ message: 'No event with this uuid exists.' });
    }
    
});

router.use('/:eventId/tickets', require('./tickets'));

module.exports = router;