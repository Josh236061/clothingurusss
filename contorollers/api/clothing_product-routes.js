const router = require('express').Router();
const sequelize = require('../../config/connection');
const { clothing_product, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./user_routes');

router.get("/", (req, res) => {
    clothing_product.findAll({
        attributes: [
            'id',
            'product',
            'color',
            'size',
            'price'
          ],
          include: [{
                  model: User,
                  attributes: ["username"],
              },
          ],
      })
      .then((dbClothingProductData) => res.json(dbClothingProductData))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
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
      res.json(dbClothingProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    clothing_product.create({
    product: req.body.product,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    user_id: req.session.user_id
  })
    .then(dbClothingProductData => res.json(dbClothingProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
clothing_product.update(
    {
       product: req.body.product
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbClothingProductData => {
      if (!dbClothingProductData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbClothingProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete ('/:id', (req, res)=> {
  clothing_product.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbDeleteData => {
    if (!dbDeleteData) {
      res.status(404).json({
        message:'No Delete found with this id'
      });
      return;
    }
    res.json(dbDeleteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})
module.exports = router;
