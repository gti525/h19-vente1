const mongoose = require('mongoose');
const PaymentSchema = require('../schemas/Payment.js');

const Payment = new mongoose.model('Payment', PaymentSchema);

// Crée une nouvelle trace de paiement
exports.createPaymentTrace = async function(body, next) {
    console.log("In PaymentTrace")
    const { tickets, amount } = body;
    var alphaNumCode = makeRandomAlphaNumericCode(16);
    const payment = new Payment({
        alphaNumCode,
        amount,
        tickets
    })
    await payment.save(function(err) {
        if(err) next(err);
    })
    return alphaNumCode;
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