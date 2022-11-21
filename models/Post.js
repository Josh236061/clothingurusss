const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

  static liked(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      post_id: body.post_id,
    })
      .then(() => Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'product_name',
          'description',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post_id = post.id)'), 'like_count']
        ]
      }));
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    img_file: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5,2),
    //   allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  },
);

module.exports = Post;
