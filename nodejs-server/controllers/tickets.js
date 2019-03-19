const express = require('express');
const router = express.Router();

const Event = require('../models/Event.js');
const Ticket = require('../models/Ticket.js');

const { sendTickets } = require('./social.js');

router.post('/buyTickets', async function(req, res) {
    //Vérifier que le event est encore ouvert
    Object.keys(tickets).forEach(async function(key) {
        await Event.check
    })
    //Vérifier que les billets sont encore réservés

    //Paiement

    //Marquer les billets comme vendus

    //Envoyer au réseau social
    var events = await Event.getAllOpenedEvents();
    res.status(200).json({
        message: 'Successfully sent tickets to social.',
        events
    });
});

module.exports = router;