const router = require('express').Router()
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage Route
router.get('/', async(req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        const posts = blogData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// Route to a single post
router.get('/blogpost/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['username'],
                },
            ],
        });
        const post = postData.get({ plain: true });

        res.render('blogpost', {
            ...post, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogPost }],
      });
      const user = userData.get({ plain: true });
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Route to login page
router.get('/login', (req, res) => {
    if (req.session.logged_in){
        res.redirect('/profile')
        return;
    }
    res.render('login')
})

// Route to edit page
router.get('/editpost', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: [password] },
            include: [{ model: BlogPost}], 
        });
        const user = userData.get({ plain: true });
        res.render('editpost', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router