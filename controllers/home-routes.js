const router = require('express').Router();
const sequelize = require('../config/connection');
const { clothing_product, User } = require('../models');

router.get('/', (req, res) => {
  clothing_product.findAll({
    attributes: [
      'id',
      'product',
      'color',
      'size',
      'price'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbClothingProductData => {
      const clothing_product = dbClothingProductData.map(clothing_product => clothing_product.get({ plain: true }));

      res.render('homepage', {
        clothing_product,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/clothing_product/:id', (req, res) => {
  clothing_product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'product',
      'color',
      'size',
      'price'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbClothingProductData => {
      if (!dbClothingProductData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const clothing_product = dbClothingProductData.get({ plain: true });

      res.render('single-post', {
        clothing_product,
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
