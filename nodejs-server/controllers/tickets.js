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
                message: "Le délai de réservation de vos billets a été dépassé.\nVeuillez recommencer votre achat de billets."
            });
            return;
        }
    }

    //Paiement create
    var transaction = await preValidate(req.body);
    if(transaction.status === 500) {
        console.log("Error 500 : Passerelle messed up.");
        res.status(transaction.status).json({
            message: "Une erreur est survenue lors du traitement de vos informations de paiement."
        })
    } else if(transaction.status === 401) {
        console.log("Error 401 : Marchant_Api_Key is missing. How???");
        res.status(transaction.status).json({
            message: "Une erreur est survenue lors de l'authentification du paiement."
        })
    } else if(transaction.status === 400) {
        console.log("Error 400 : Problem with the data format sent to payment/create.");
        res.status(transaction.status).json({
            message: "Vos informations de carte de crédit sont invalides\nVeuillez les vérifier et essayer de nouveau."
        })
    } else if(transaction.status !== 200) {
        console.log("Error !200 : No idea what happened but not 500, 401, 400 or 200");
        res.status(transaction.status).json({
            message: "Une erreur est survenue."
        })
    } else if(transaction.data.result === "DECLINED") {
        console.log("Payment information is invalid.")
        res.status(400).json({
            message: "Vos informations de carte de crédit sont invalides\nVeuillez les vérifier et essayer de nouveau."
        });
        return;
    } else {
        //Paiement process
        var processedTransaction = await processTransaction(transaction.data.transaction_number);
        if(processedTransaction.status !== 200) {
            console.log("Error !200 : Something broke in payment/process.")
            res.status(processedTransaction.status).json({
                message: "Une erreur est survenue lors du paiement."
            });
        } else {
            //Sauvegarder la trace de la vente confirmée
            var confirmationCode = await Payment.createPaymentTrace(req.body, next)
            console.log("confirmationCode: " + confirmationCode);

            //Marquer les billets comme vendus
            await Ticket.markAsSold(tickets);
        
            //Envoyer au réseau social si connecté
            var message = "Les billets ont été achetés.\nIls seront récupérables le soir de l'événement.";
            if(Authorization) {
                console.log("Sending tickets to social");
                var socialResponse = await sendTickets(req.body.Authorization, tickets);
                if(socialResponse.status !== 200) {
                    console.log("Sending tickets to social didnt work");
                    message = "Les billets ont été achetés, mais n'ont pas pu être ajoutés à votre profil social dû à une erreur interne.";
                } else {
                    console.log("Sending tickets to social worked");
                    message = "Les billets ont été achetés !\nIls seront disponibles sur le site du réseau social ainsi que sur l'application mobile.";
                }
            }
            res.status(200).json({
                message,
                confirmationCode
            });
            console.log("end");
        }
    }
    console.log("end");
});

module.exports = router;