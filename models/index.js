// import all models
const User = require('./User');
const clothing = require('./clothing');
const account_purchase = require('./account_purchase');

// create associations
User.hasMany(account_purchase, {
  foreignKey: 'User_id'
});

account_purchase.belongsTo(User, {
  foreignKey: 'User_id',
  onDelete: 'SET NULL'
});

clothing.hasMany(account_purchase, {
  foreignKey: 'clothing_id'
});

account_purchase.belongsTo(clothing, {
  foreignKey: 'clothing_id',
  onDelete: 'SET NULL'
});


module.exports = { User, clothing, account_purchase };
