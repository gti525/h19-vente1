var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
        adminId: {
            type: String,
            required: true
        },
        uuid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
)