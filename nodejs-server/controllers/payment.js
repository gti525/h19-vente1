var express = require('express');
var router = express.Router();
const axios = require('axios');
const { PAYMENT_API } = require("../apis/routes.js");

var preValidate = async function(body) {
    var response;
    await axios.post(`${PAYMENT_API}/transaction/create`, {
        MERCHANT_API_KEY: "6DzO/GgmEp2iyEkxNCDBmkc1syTRYhO01Oq8nckDyLE=",
        amount: body.amount,
        purchase_desc: "PURCHASE/ Tickets ",
        credit_card: {
            first_name: body.ccPrenom,
            last_name: body.ccNom,
            number: body.ccNumero,
            cvv: body.ccCvv,
            exp: {
                month: body.ccMoExp,
                year: body.ccAnExp
            }
        },
    })
    .then(function(res) {
        response = res;
    })
    .catch(function(err) {
        response = err.response;
    })
    return response;
};

router.post('/process', function(req, res) {
    var { body } = req;
    axios.post(`${PAYMENT_API}/transaction/create`, {
        MERCHANT_API_KEY: "6DzO/GgmEp2iyEkxNCDBmkc1syTRYhO01Oq8nckDyLE=",
        amount: 100,
        purchase_desc: "PURCHASE/ Tickets ",
        credit_card: {
            first_name: body.ccPrenom,
            last_name: body.ccNom,
            number: body.ccNumero,
            cvv: body.ccCvv,
            exp: {
                month: body.ccMoExp,
                year: body.ccAnExp
            }
        },
    })
    .then(function(response) {
        console.log("in then")
        var data = response.data;
        res.status(200).json({
            data
        });
    })
    .catch(function(error) {
        console.log("in err")
        res.status(error.response.status).json({
            message: error.message
        });
    })
});

module.exports = { preValidate };