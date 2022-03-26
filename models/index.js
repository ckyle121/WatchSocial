const User = require("./User");
const Comment = require("./Comment");
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

module.exports = { User, Comment, Movie };

