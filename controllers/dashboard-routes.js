const router = require('express').Router();
const sequelize = require('../config/connection');
const { clothing_product, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  clothing_product.findAll({
    where: {
      user_id: req.session.user_id
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
      const account = dbClothingProductData.map(account => account.get({ plain: true }));
      res.render('dashboard', { account, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
      res.status(404).json({ message: 'No item found with this id' });
      return;
    }

    const account = dbClothingProductData.get({ plain: true });

    res.render('edit-clothing', {
      account,
    loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;