var Admin = require('../models/Admin.js');

module.exports.isAdmin  = async function(req, res, next) {
    var admin = await Admin.checkIfExists(req.get('adminKey'), next);
    if(!admin) {
        var err = new Error('Your Admin Key doesnt correspond to an active administrator.');
        err.status = 401;
        return next(err);
    } else{
        return next();
    }
}