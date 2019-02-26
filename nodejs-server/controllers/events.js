var express = require('express');
var router = express.Router();
var Event = require('../models/Event.js');

router.get('/', function(req, res) {
    res.status(200).json({ message: 'Yeaaaa!' });
})

module.exports = router;