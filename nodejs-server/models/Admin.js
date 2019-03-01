const mongoose = require('mongoose');
const AdminSchema = require('../schemas/Admin.js');

const Admin = new mongoose.model('Admin', AdminSchema);

exports.checkIfExists = async function(adminId, next) {
    try {
        var isAdmin = await Admin.findOne({ "_id" : adminId })
        return isAdmin;
    } catch(err) {
        return next(err);
    }
}