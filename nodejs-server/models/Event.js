var mongoose = require('mongoose');
const EventSchema = require('../schemas/Event.js');

module.exports = new mongoose.model('Event', EventSchema);