const router = require('express').Router();
const userRoutes = require('./user_routes');
const clothingRoutes = require('./clothing_routes');

router.use('/User', userRoutes);
router.use('/Clothing', clothingRoutes);

module.exports = router;
