const router = require('express').Router();
const userRoutes = require('./user_routes');
const clothingRoutes = require('./clothing_routes');
const account_purchase_routes= require('./account_purchase_routes');

router.use('/User', userRoutes);
router.use('/Clothing', clothingRoutes);
router.use('/account_purchase', account_purchase_routes);

module.exports = router;
