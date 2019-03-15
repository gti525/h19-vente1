var express = require('express');
var router = express.Router();
const axios = require('axios');
const { PAYMENT_API } = require("../apis/routes.js");

router.post('/create', function(req, res) {
    var { body } = req;
    axios.post(`${PAYMENT_API}/transaction/create`, {
        MERCHANT_API_KEY: "1234567890",
        amount: 100,
        purchase_desc: "PURCHASE/ Simons ",
        credit_card: {
            first_name: "John",
            last_name: "Doe",
            number: 1111222233334444,
            cvv: 765,
            exp: {
            month: 10,
            year: 2030
            }
        },
    })
    .then(function(response) {
        console.log(response);
        var data = response.data;
        res.status(200).json({
            data
        });
    })
    .catch(function(error) {
        console.log(error);
        res.status(error.response.status).json({
            message: error.message
        });
    })
});

module.exports = router;