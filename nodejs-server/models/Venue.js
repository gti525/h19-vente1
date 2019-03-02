const mongoose = require('mongoose');
const VenueSchema = require('../schemas/Venue.js');

const Venue = new mongoose.model('Venue', VenueSchema);

exports.checkIfExists = async function(venueName) {
    var venue = await Venue.findOne({ "name" : venueName })
    if(venue) return venue._id;
    else return false;
}

exports.createVenue = function(venueInfos) {
    const venue = new Venue(venueInfos)
    venue.save(function(err) {
        if(err) {
            console.log(err);
            return err;
        }
    })
    return venue._id;
}