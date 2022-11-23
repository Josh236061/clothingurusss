const sequelize = require('../config/connection');
const { clothing_product } = require('../models');

const clothing_productdata = [
  {
    user_id: 1,
    clothing_id: 1,
    cost: 12.25
  },
  {
    user_id: 1,
    clothing_id: 2,
    cost: 12.25
  },
  {
  user_id: 2,
  clothing_id: 2,
  cost: 12.25
  }
];

const seedclothing_product = () => clothing_product.bulkCreate(clothing_productdata, {individualHooks: true});

module.exports = seedclothing_product;
