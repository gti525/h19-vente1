const mongoose = require('mongoose');
const VenueSchema = require('../schemas/Venue.js');

const Venue = new mongoose.model('Venue', VenueSchema);

// Détermine si un venue de la BD possède ce uuid avec cet administrateur
exports.checkIfExists = async function(adminId, uuid) {
    var venue = await Venue.findOne({ "adminId": adminId, "uuid" : uuid })
    if(venue) return venue._id;
    else return false;
}

// Crée un nouveau venue
exports.createVenue = async function(adminId, venueInfos, next) {
    const venue = new Venue({
        adminId,
        uuid: venueInfos.uuid,
        name: venueInfos.name,
        address: venueInfos.address,
        capacity: venueInfos.capacity
    })
    await venue.save(function(err) {
        if(err) next(err);
    })
    return venue._id;
}