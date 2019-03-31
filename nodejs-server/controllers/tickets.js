const express = require('express');
const router = express.Router();

const Event = require('../models/Event.js');
const Ticket = require('../models/Ticket.js');
const Payment = require('../models/Payment.js');

const { preValidate, processTransaction } = require('./payment.js');
const { sendTickets } = require('./social.js');

router.post('/buyTickets', async function(req, res, next) {
    var { tickets, Authorization } = req.body;
    var eventExists;
    var eventOpened;
    var ticketReserved;
    for (var ticket of tickets) {
        //Vérifier que le event existe encore
        eventExists = await Event.checkIfExists(ticket.event._id);
        if(!eventExists) {
            console.log("event doesnt exist")
            res.status(400).json({
                action: "removeTickets",
                message: "La vente d'un des événements est terminée."
            });
            return;
        }

        //Vérifier que le event est encore ouvert
        eventOpened = await Event.checkIfOpened(ticket.event._id);
        if(!eventOpened) {
            console.log("event isnt opened")
            res.status(400).json({
                action: "removeTickets",
                message: "La vente d'un des événements est terminée."
            });
            return;
        }

        //Vérifier que les billets sont encore réservés
        ticketReserved = await Ticket.checkIfReserved(ticket);
        if(!ticketReserved) {
            console.log("ticket isnt reserved")
            res.status(400).json({
                action: "removeTickets",
                message: "Le délai de réservation de vos billets a été dépassé."
            });
            return;
        }
    }

    //Paiement create
    var transaction = await preValidate(req.body);
    if(transaction.status !== 200) {
        console.log("transaction didnt create")
        res.status(transaction.status).json({
            message: "Vos informations de carte de crédit sont invalides\nVeuillez les vérifier et essayer de nouveau."
        })
    } else {
        //Paiement process
        var processedTransaction = await processTransaction(transaction.data.transaction_number);
        if(processedTransaction.status !== 200) {
            console.log("transaction didnt process")
            res.status(processedTransaction.status).json({
                message: "In process " + processedTransaction.data.message
            })
        } else {
            //Sauvegarder la trace de la vente confirmée
            var confirmationCode = await Payment.createPaymentTrace(req.body, next)
            console.log("AlphaCode: " + confirmationCode)

            //Marquer les billets comme vendus
            await Ticket.markAsSold(tickets);
        
            //Envoyer au réseau social si connecté
            var message = "Les billets ont été achetés.";
            if(Authorization) {
                console.log("Sending tickets to social");
                var socialResponse = await sendTickets(req.body.Authorization, tickets);
                if(socialResponse.status !== 200) {
                    console.log("Sending tickets to social didnt work");
                    res.status(200).json({
                        message: "Les billets ont été achetés, mais n'ont pas pu être ajoutés à votre profil social dû à une erreur interne.",
                        confirmationCode
                    });
                    return;
                } else {
                    console.log("Sending tickets to social worked");
                    message = "Les billets ont été achetés et ont été ajoutés à votre profil de réseau social.";
                }
            }
            res.status(200).json({
                message,
                confirmationCode
            });
        }
        
    }
    console.log("end")
});


module.exports = router;