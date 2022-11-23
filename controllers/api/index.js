const router = require('express').Router();
const userRoutes = require('./user_routes');
const clothing_product_routes= require('./clothing_product-routes');
const postRoutes = require('./post-routes')

router.use('/User', userRoutes);
router.use('/clothing_product', clothing_product_routes);
router.use('/posts', postRoutes)

module.exports = router;
