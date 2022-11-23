const sequelize = require('../config/connection');
const seedUser = require('./user-seeds');
const seedClothingProduct = require('./clothing_product-seeds');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedClothingProduct();

  process.exit(0);
};

seedAll();
