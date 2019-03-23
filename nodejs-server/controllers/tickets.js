const express = require('express');
const router = express.Router();

const Event = require('../models/Event.js');
const Ticket = require('../models/Ticket.js');

const { preValidate } = require('./payment.js');
const { sendTickets } = require('./social.js');

router.post('/buyTickets', async function(req, res) {
    var { tickets } = req.body;
    console.log(tickets)
    var eventExists;
    var eventOpened;
    var ticketReserved;
    for (var ticket of tickets) {
        //Vérifier que le event existe encore
        eventExists = await Event.checkIfExists(ticket.event._id);
        if(!eventExists) {
            res.status(400).json({
                message: "Un des événements a été supprimé."
            });
        }

        //Vérifier que le event est encore ouvert
        eventOpened = await Event.checkIfOpened(ticket.event._id);
        if(!eventOpened) {
            res.status(400).json({
                message: "La vente d'un des événements est terminée."
            });
        }

        //Vérifier que les billets sont encore réservés
        ticketReserved = await Ticket.checkIfReserved(ticket);
        if(!ticketReserved) {
            res.status(400).json({
                message: "Un des billets n'existe pas ou n'est plus réservé."
            });
        }
    }

    //Paiement create
    var transactionNumber = await preValidate(req.body);
    console.log(transactionNumber)
    //Paiement process

    //Marquer les billets comme vendus
    //await Ticket.markAsSold(tickets);


    //Envoyer au réseau social
    //var socialResponse = await sendTickets(req.body.Authorization, tickets);
    //res.status(socialResponse.status).json({
    //    message: socialResponse.statusText,
    //});

    res.status(200).json({
        message: "Tout est beau !"
    });
    console.log("end")

});

module.exports = router;