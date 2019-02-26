var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: ObjectId,
        ref: 'Venue',
        //required: true
    },
    tickets: [{
        type: ObjectId,
        ref: 'Ticket'
    }]
});