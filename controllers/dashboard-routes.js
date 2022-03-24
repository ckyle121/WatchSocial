const router = require("express").Router();
const sequelize = require("../config/connection");
const { Movie, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all comments for dashboard
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");
  Comment.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "comment_text",
      "movie_id",
      "movie_rating",
      "created_at",
    ],
    include: [
      {
        model: Movie,
        attributes: ["id", "title", "poster"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCommentData) => {
      const comments = dbCommentData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { comments, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  // ???????????????
  Comment.findByPk(req.params.id, {
    attributes: [
      "id",
      "comment_text",
      "movie_id",
      "movie_rating",
      "created_at",
    ],
    include: [
      {
        model: Movie,
        attributes: ["id", "title", "poster"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
