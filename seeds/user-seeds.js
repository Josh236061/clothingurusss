const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'bobwhite',
    email: 'bobwhite@gmail.com',
    password: 'password123'
  },
  {
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'password123'
  },
{
    username: 'janedoe',
    email: 'janedoe@gmail.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
