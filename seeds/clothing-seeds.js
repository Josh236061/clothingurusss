const sequelize = require('../config/connection');
const { clothing } = require('../models');

const clothingdata = [
  {
    item: 'Shirt',
    color: 'White',
    size: 'Small',
    price: 12.25
  },
  {
    item: 'Shirt',
    color: 'White',
    size: 'Medium',
    price: 12.25
  },
  {
    item: 'Shirt',
    color: 'White',
    size: 'Large',
    price: 12.25
  }
];

const seedClothing = () => clothing.bulkCreate(clothingdata, {individualHooks: true});

module.exports = seedClothing;
