const router = require('express').Router();
const { Clothing } = require('../../config/models');
const { user, Clothing } = require('../models');

// GET all clothing for homepage
router.get('/', async (req, res) => {
  try {
    const dbClothingData = await Clothing.findAll({
      include: [
        {
          model: Clothing,
          attributes: ['item', 'color', 'size', 'price'],
        },
      ],
    });

    const Clothing = dbClothingData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'Clothing' template
    res.render('Clothing', { Clothing, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Clothing
router.get('/clothing/:id', async (req, res) => {
  try {
    const dbClothingData = await Clothing.findByPk(req.params.id, {
      include: [
        {
          model: Clothing,
          attributes: ['item', 'color', 'size', 'price'],
        },
      ],
    });

    const Clothing = dbClothingData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'Clothing' template
    res.render('Clothing', { Clothing, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
