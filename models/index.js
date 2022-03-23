// const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
// const Rating = require("./Rating");
const Movie = require("./Movie");

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Movie.hasMany(Comment, {
  foreignKey: "movie_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Movie, {
  foreignKey: "movie_id",
});

// User.hasMany(Post, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// Post.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.belongsToMany(Post, {
//   through: Rating,
//   as: "rated_posts",
//   foreignKey: "user_id",
// });

// Post.belongsToMany(User, {
//   through: Rating,
//   as: "rated_posts",
//   foreignKey: "post_id",
// });

// Rating.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Rating.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

// User.hasMany(Rating, {
//   foreignKey: 'user_id'
// });

// Post.hasOne(Rating, {
//   foreignKey: 'post_id'
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });

// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

module.exports = { User, Comment, Movie };
// module.exports = { User, Post, Comment, Rating };
