var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth.js');
var Event = require('../models/Event.js');

router.post('/', auth.isAdmin, function(req, res) {
    Event.createEvent(req.body);
    res.status(200).json({ message: 'In Event controller!' });
})

router.put('/:eventId', auth.isAdmin, function(req, res) {
    Event.updateEvent(req.params.eventId, req.body);
    res.status(200).json({ message: 'In Event controller!' });
})

router.use('/:eventId/tickets', require('./tickets'));

module.exports = router;