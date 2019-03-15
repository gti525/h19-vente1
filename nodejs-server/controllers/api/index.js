const router = require('express').Router();
const path = require('path');

router.use('/swagger', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/swagger.html'));
});

router.use('/events', require('./events'));

module.exports = router;