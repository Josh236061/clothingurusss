const router = require('express').Router();

const userRoutes = require('./user_routes');
const clothingRoutes = require('./clothing-routes');

router.use('/users', userRoutes);

module.exports = router;
