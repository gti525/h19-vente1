var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
        confirmationCode: {
            type: String,
            required: true
        },
        tickets: [{
                type: ObjectId,
                ref: 'Ticket',
                required: true
        }],
        amount: {
            type: Number,
            required: true
        },
        ccName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        }
    },
    {
        versionKey: false
    }
)