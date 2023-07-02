const router = require('express').Router()
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth')

// Create new Post
router.post('/', withAuth, async (req,res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Modify a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'This post could not be found!' });
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'This post could not be found!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});



module.exports = router