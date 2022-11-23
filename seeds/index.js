const sequelize = require('../config/connection');
const seedUser = require('./user-seeds');
const seedClothing = require('./clothing-seeds');
const seedAccountPurchase = require('./clothing_product-seeds');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedClothing();

  await seedAccountPurchase();

  process.exit(0);
};

seedAll();
