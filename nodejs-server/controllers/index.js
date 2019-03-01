const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.use('/swagger', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/swagger.html'));
});

router.use('/events', require('./events'))

module.exports = router;