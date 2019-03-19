const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.use('/api', require('./api/index.js'));

router.use('/events', require('./events'));

router.use('/tickets', require('./tickets'));

router.use('/payment', require('./payment'));

router.use('/social', require('./social'));

module.exports = router;