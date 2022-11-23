const sequelize = require('../config/connection');
const { clothing_product } = require('../models');

const clothing_product_data = [
  {
    product: 'Shirt',
    color: 'White',
    size: 'Small',
    price: 12.25,
    user_id: 1,
  },
  {
    product: 'Shirt',
    color: 'White',
    size: 'Medium',
    price: 12.25,
    user_id: 1,
  },
  {
    product: 'Shirt',
    color: 'White',
    size: 'Large',
    price: 12.25,
    user_id: 2,
  }
];

const seedClothingProduct = () => clothing_product.bulkCreate(clothing_product_data, {individualHooks: true});

module.exports = seedClothingProduct;
