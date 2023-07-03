const router = require('express').Router()
const { User } = require('../../models')

// Create a new User
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/login', async (res, req) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,  
            },
        });

        if (!userData) {
            res.status(400)
            .json({ message: 'Incorrect email or password. Please try again! '});
            return
        }

        const validPw = await userData.checkPassword(req.body.password);
        if (!validPw) {
            res.status(400)
            .json({ message: 'Incorrect email or password. Please try again!'});
            return
        }

        req.session.save(() => {
            req.session.logged_in = true;
            res
            .json({ user: userData, message: 'You have successfully logged in!' });
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
})



module.exports = router