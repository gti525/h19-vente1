var express = require('express');
var router = express.Router();
var TicketModel = require('../models/Ticket.js');

router.post('/:eventId', function(req, res) {
    TicketModel.addTicket(req.params.eventId, req.body.uuid)
    res.status(200).json({ message: 'In Ticket controller!' });
})

module.exports = router;