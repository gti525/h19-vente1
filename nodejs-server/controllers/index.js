const router = require('express').Router();
const socialRouter = require('./social').router;

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.use('/api', require('./api/index.js'));

router.use('/events', require('./events'));

router.use('/tickets', require('./tickets'));

router.use('/social', socialRouter);

module.exports = router;