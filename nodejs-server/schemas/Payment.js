var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
        alphaNumCode: {
            type: String,
            required: true
        },
        tickets: [
            {
                type: ObjectId,
                ref: 'Ticket',
                required: true
            }
        ]
    },
    {
        versionKey: false
    }
)