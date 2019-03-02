var express = require('express');
var router = express.Router();
const axios = require('axios');

router.post('/', function(req, res) {
    var { body } = req;
    axios.post('ROUTE DE PASSERELLE DE PAIEMENT', {
       firstName: body.firstName,
       lastName: body.lastName,
       cardNumber: body.cardNumber,
       monthExp: body.monthExp,
       yearExp: body.yearExp,
       cvv: body.cvv,
       amount: body.amount,
       description: body.description
    })
    .then(function(response) {
        console.log(response);
        res.status(response.code).json({
            message: response.message,
            description: response.description,
            transactionId: response.transactionId
        });
    })
    .catch(function(error) {
        console.log(error);
        res.status(error.code).json({
            message: error.message,
            description: error.description
        });
    })
})

module.exports = router;