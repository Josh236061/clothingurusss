const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class account_purchase extends Model {}

account_purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    clothing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clothing',
        key: 'id'
      }
    },
    cost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'account_purchase'
  }
);

module.exports = account_purchase;
