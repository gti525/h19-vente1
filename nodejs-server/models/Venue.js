var mongoose = require('mongoose');
const VenueSchema = require('../schemas/Venue.js');

module.exports = new mongoose.model('Venue', VenueSchema);