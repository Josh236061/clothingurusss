const sequelize = require('../config/connection');
const { clothing } = require('../../models');

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
    item: 'Shirt',
    color: 'White',
    size: 'Large',
    price: 12.25
  }
];

const seedClothing = () => clothing.bulkCreate(clothingdata, {individualHooks: true});

module.exports = seedClothing;
