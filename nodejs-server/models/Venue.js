const mongoose = require('mongoose');
const VenueSchema = require('../schemas/Venue.js');

const Venue = new mongoose.model('Venue', VenueSchema);

// Détermine si un venue de la BD possède ce uuid avec cet administrateur
exports.checkIfExists = async function(adminId, venueName) {
    var venue = await Venue.findOne({ "adminId": adminId, "name" : venueName })
    if(venue) return venue._id;
    else return false;
}

// Crée un nouveau venue
exports.createVenue = async function(venueInfos, next) {
    const venue = new Venue(venueInfos)
    await venue.save(function(err) {
        if(err) next(err);
    })
    return venue._id;
}