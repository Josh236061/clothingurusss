const router = require('express').Router();
const sequelize = require('../config/connection');
const { clothing } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  clothing.findAll({
    attributes: ['item', 'color', 'size', 'price'],
  })
    .then(dbClothingData => {
      const posts = dbClothingData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  clothing.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['item', 'color', 'size', 'price'],
  })
    .then(dbClothingData => {
      if (!dbClothingData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const clothing = dbClothingData.get({ plain: true });

      res.render('single-clothing', {
        clothing,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
