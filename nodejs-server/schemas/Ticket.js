var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    event: {
        type: ObjectId,
        ref: 'Event',
        required: true
    }
})