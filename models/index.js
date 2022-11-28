// import all models
const User = require('./User');
const clothing_product = require('./clothing_product');

// create associations
User.hasMany(clothing_product, {
  foreignKey: 'User_id'
});

clothing_product.belongsTo(User, {
  foreignKey: 'User_id',
  onDelete: 'SET NULL'
});



module.exports = { User, clothing_product };
