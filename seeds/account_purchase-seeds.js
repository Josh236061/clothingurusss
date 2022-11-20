const sequelize = require('../config/connection');
const { account_purchase } = require('../models');

const account_purchasedata = [
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

const seedAccount_Purchase = () => account_purchase.bulkCreate(account_purchasedata, {individualHooks: true});

module.exports = seedAccount_Purchase;
