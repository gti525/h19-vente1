var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var EventSchema = new mongoose.Schema({
        adminId: {
            type: String,
            ref: 'Admin',
            required: true
        },
        uuid: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        artist: {
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
        price: {
            type: Number,
            required: true
        },
        venue: {
            type: ObjectId,
            ref: 'Venue',
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

EventSchema.pre('remove', async function(next, Ticket) {
    await Ticket.deleteTickets(next, this._id)
    next();
})

module.exports = EventSchema;