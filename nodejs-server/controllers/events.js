const express = require('express');
const router = express.Router();

const Event = require('../models/Event.js');
const Ticket = require('../models/Ticket.js');

const tempsDeReservationMaximum = 20*60*1000; //20 minutes

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
        res.status(400).json({ message: `Nombre de billets invalide.` });
    } else {
        var event_id = await Event.checkIfExists(req.params.eventId);
        if(event_id) {
            var eventOpened = await Event.checkIfOpened(event_id);
            if(!eventOpened) {
                console.log("in " + eventOpened )
                res.status(400).json({ message: "Cet événement ne vend plus de billets." })
            } else {
                var isTicketsAvailable = await Ticket.checkIfTicketsAvailable(event_id, req.body.numberOfTickets);
                if(isTicketsAvailable) {
                    var tickets = await Ticket.reserveTickets(event_id, req.body.numberOfTickets);
                    setTimeout(Ticket.unReserveTickets, tempsDeReservationMaximum, tickets)
                    res.status(200).json({
                        message: `Successfully reserved ${req.body.numberOfTickets} ticket(s).`,
                        tickets
                    });
                } else {
                    res.status(200).json({
                        error: `Il n'y a pas assez de billets disponibles pour votre commande.`
                    });
                }
            }
        } else {
            res.status(200).json({
                error: 'Cet événement nexiste plus.'
            });
        }
    }
});

module.exports = router;