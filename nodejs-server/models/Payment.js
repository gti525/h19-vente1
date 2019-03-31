const mongoose = require('mongoose');
const PaymentSchema = require('../schemas/Payment.js');

const Payment = new mongoose.model('Payment', PaymentSchema);

// Crée une nouvelle trace de paiement
exports.createPaymentTrace = async function(body, next) {
    console.log("In PaymentTrace")
    const { tickets, amount, ccNom, ccPrenom, nom, prenom } = body;
    var ticketUuids = [];
    var i = 0;
    for(var ticket of tickets) {
        console.log(ticket.uuid)
        ticketUuids[i] = ticket.uuid;
        i++;
    }
    console.log(ticketUuids)
    var confirmationCode = makeRandomAlphaNumericCode(16);
    const payment = new Payment({
        confirmationCode,
        amount,
        tickets: ticketUuids,
        ccName: ccPrenom + " " + ccNom,
        name: prenom + " " + nom
    })
    await payment.save(function(err) {
        if(err) next(err);
    })
    return confirmationCode;
};

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/38622545
var makeRandomAlphaNumericCode = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789";
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}