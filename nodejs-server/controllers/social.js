const express = require('express');
const router = express.Router();
const axios = require('axios');
const { SOCIAL_API } = require("../apis/routes.js");

router.post('/login', function(req, res) {
    console.log("in login")
    var { body } = req;
    axios.post(`${SOCIAL_API}/client/login`, {
        email : body.email,
        password : body.password
    })
    .then(function(response) {
        res.status(200).json({
            data: response.data
        });
    })
    .catch(function(error) {
        res.status(error.response.status).json({
            message: error.response.statusText,
        });
    })
});

var sendTickets = async function(authToken, tickets) {
    var response;
    console.log("In Social")
    for (ticket of tickets) {
        await axios.post(`${SOCIAL_API}/Ticket`,
        {
            UUID: ticket.uuid,
            EventName: ticket.event.title,
            Artist: ticket.event.artist,
            Date: ticket.event.date,
            Location: ticket.event.venue.address
        },
        {
            headers: {'Authorization': "bearer " + authToken}
        })
        .then(function(res) {
            response = res;
        })
        .catch(function(err) {
            response = err.response;
            return response;
        })
    }
    return response;
};

module.exports = {router, sendTickets};