const sequelize = require('../config/connection');
const { account_purchase } = require('../../models');

const account_purchasedata = [
  {
    user_id: 1,
    clothing_id: 1
  },
  {
    user_id: 1,
    clothing_id: 2
  },
 /*  {
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
  {
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123'
  },
  {
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123'
  },
  {
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123'
  },
 */    {
  user_id: 2,
  clothing_id: 2
  }
];

const seedAccount_Purchase = () => account_purchase.bulkCreate(account_purchasedata, {individualHooks: true});

module.exports = seedAccount_Purchase;
