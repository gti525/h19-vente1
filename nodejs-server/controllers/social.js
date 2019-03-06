const express = require('express');
const router = express.Router();
const axios = require('axios');
const { SOCIAL_API } = require("../apis/routes.js");

router.post('/login', function(req, res) {
    var { body } = req;
    axios.post(`${SOCIAL_API}/login`, {
        email : body.email,
        password : body.password
    })
    .then(function(response) {
        console.log(response);
        res.status(200).json({
            data: response.data
        });
    })
    .catch(function(error) {
        console.log(error);
        res.status(error.response.status).json({
            message: error.response.statusText,
        });
    })
});

module.exports = router;