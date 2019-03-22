const express = require('express');
const router = express.Router();
const axios = require('axios');
const { SOCIAL_API } = require("../apis/routes.js");

router.post('/client/login', function(req, res) {
    var { body } = req;
    axios.post(`${SOCIAL_API}/login`, {
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
    console.log("in SendTickets")
    console.log(tickets)
    var response;

    socialTickets = tickets = await adaptTickets(tickets);

    await axios.post(`${SOCIAL_API}/Ticket`,
    {
        tickets
    },
    {
        headers: {'Authorization': "bearer " + authToken}
    })
    .then(function(res) {
        response = res;
    })
    .catch(function(err) {
        response = err.response;
    })
    return response;
};

var adaptTickets = function(tickets) {
    var newTickets = [];
    var i = 0;
    for (ticket of tickets) {
        console.log(ticket)
        newTickets[i] = {
            UUID: ticket.uuid,
            EventName: ticket.event.title,
            Artist: ticket.event.artist,
            Date: ticket.event.date
        }
        i++;
    }
    console.log("hihi")
    console.log(newTickets);
}

module.exports = {router, sendTickets};