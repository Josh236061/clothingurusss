const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');
const Category = require('./Category');
const Comment = require('./Comment');


// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id',
});

Post.belongsToMany(User, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'post_id',
});

Like.belongsTo(User, {
    foreignKey: 'user_id',
});

Like.belongsTo(Post, {
    foreignKey: 'post_id',
});

User.hasMany(Like, {
    foreignKey: 'user_id',
});

Post.hasMany(Like, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});


Post.belongsTo(Category, {
    foreignKey: 'category_id',
});


Category.hasMany(Post, {
    foreignKey: 'category_id'
});

module.exports = { User, Post, Like, Category, Comment };
