import express from 'express';
import passport from 'passport';
import Post from '../../models/Post';
import Profile from '../../models/Profile';
import validatePostInput from '../../validation/post';

const router = express.Router();


// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;
    const { id } = req.user;
    const newPost = new Post({
        text, name, avatar, user: id
    });

    newPost.save().then(post => res.json(post));
})

// @route   GET api/posts
// @desc    Get post
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPosts: 'no posts found' }));
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPostFound: 'No post found by this ID' }));
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOne({ user: id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User not authorized' });
                    }

                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOne({ user: id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: 'User already liked this post' });
                    }

                    post.likes.unshift({ user: id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        Profile.findOne({ user: id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ notliked: 'You have not yet liked this post' });
                    }

                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(id);

                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.user;
        const { errors, isValid } = validatePostInput(req.body);
        const { text, name, avatar } = req.body;

        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text,
                    name,
                    avatar,
                    user: id
                };

                post.comments.unshift(newComment);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id, comment_id } = req.params;
        Post.findById(id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'Comment does not exist' });
                }

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(comment_id);

                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);

module.exports = router;
