const express = require('express');
const router = express.Router();
const axios = require('axios');
const { SOCIAL_API } = require("../apis/routes.js");

router.post('/login', function(req, res) {
    var { body } = req;
    axios.post(`${SOCIAL_API}/client/login`, {
        email : body.email,
        password : body.password
    })
    .then(function(response) {
        console.log(response);
        res.status(200).json({
            data: response.data
        });
    })
    .catch(function(error) {
        console.log(error);
        res.status(error.response.status).json({
            message: error.response.statusText,
        });
    })
});

var sendTickets = async function(authToken, tickets) {
    var response;
console.log("AAAAAAAAHHHHHHHHH")
console.log(tickets)
    for (ticket of tickets) {
        console.log(ticket)
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
            console.log("in then")
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