var mongoose = require('mongoose');
const ShowSchema = require('../schemas/Show.js');

module.exports = new mongoose.model('Show', ShowSchema);