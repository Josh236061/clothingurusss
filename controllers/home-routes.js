const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Category } = require('../models');

// PHOTO UPLOAD ROUTE//

router.post('/uploads', async (req, res) => {
  let photoUpload;
  let uploadPath;

  console.log('this is req.files', req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No photos uploaded.');
  }

  photoUpload = req.files.photoUpload;
  uploadPath = './public/images/' + photoUpload.name;


  photoUpload.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  })
})

// Post Routes//

router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: [
      'id',
      'product_name',
      'description',
      'created_at',
      'img_file',
      'price',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post_id = post.id)'), 'like_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'product_name',
      'description',
      'created_at',
      'price',
      'img_file',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post_id = post.id)'), 'like_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Category routes

router.get('/category/:id', (req, res) => {
  Category.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: [
          'product_name',
          'description',
          'created_at',
          'price'
        ]
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      const cat = dbPostData;

      res.render('cat', {
        cat,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;