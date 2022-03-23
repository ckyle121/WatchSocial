const router = require("express").Router();
const sequelize = require("../config/connection");
const { Movie, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Movie.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "movie_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbMovieData) => {
      const movies = dbMovieData.map((movie) => movie.get({ plain: true }));

      res.render("homepage", {
        movies,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get("/movie/:id", (req, res) => {
  Movie.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "movie_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbMovieData) => {
      if (!dbMovieData) {
        res.status(404).json({ message: "No movie found with this id" });
        return;
      }

      const movie = dbMovieData.get({ plain: true });

      res.render("single-post", {
        movie,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
