const router = require('express').Router();
const sequelize = require('../config/connection');
const { clothing, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  clothing.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['item', 'color', 'size', 'price'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbClothingData => {
      const clothing = dbClothingData.map(clothing => clothing.get({ plain: true }));
      res.render('dashboard', { clothing, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  clothing.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['item', 'color', 'size', 'price'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbClothingData => {
    if (!dbClothingData) {
      res.status(404).json({ message: 'No dashboard found with this id' });
      return;
    }

    const clothing = dbClothingData.get({ plain: true });

    res.render('edit-clothing', {
    clothing,
    loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;