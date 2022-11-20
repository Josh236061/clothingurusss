const router = require('express').Router();
//const sequelize = require('../config/connection');
const { account_purchase, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', (req, res) => {
  account_purchase.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'clothing_id',
      'cost'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbAccountPurchaseData => {
      if (!dbAccountPurchaseData) {
        res.status(404).json({ message: 'No shopping cart found with this id' });
        return;
      }
      res.json(dbAccountPurchaseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  account_purchase.create({
    user_id: req.session.user_id,
    cost: req.body.cost
  })
  .then(dbAccountPurchaseData => {
    req.session.save(() => {
      req.session.user_id = dbAccountPurchaseData.id;
      req.body.cost = dbAccountPurchaseData.cost;

      res.json(dbAccountPurchaseData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
  account_purchase.update(
    {
      cost: req.body.cost
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbAccountPurchaseData => {
      if (!dbAccountPurchaseData) {
        res.status(404).json({ message: 'No shopping cart found with this id' });
        return;
      }
      res.json(dbAccountPurchaseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAccountPurchaseData => {
      if (!dbAccountPurchaseData) {
        res.status(404).json({ message: 'No shopping cart found with this id' });
        return;
      }
      res.json(dbAccountPurchaseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
