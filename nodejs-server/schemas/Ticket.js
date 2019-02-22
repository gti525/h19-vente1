var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    show: {
        type: ObjectId,
        ref: 'Show',
        required: true
    }
})