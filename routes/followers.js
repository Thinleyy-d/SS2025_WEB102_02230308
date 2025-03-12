const express = require('express');
const {
    getFollowers,
    followUser,
    unfollowUser
} = require('../controllers/followerController');

const router = express.Router({ mergeParams: true });

// GET /users/:id/followers
router.route('/')
    .get(getFollowers);

// POST /users/:id/follow
router.route('/follow')
    .post(followUser);

// DELETE /users/:id/follow/:followerId
router.route('/follow/:followerId')
    .delete(unfollowUser);

module.exports = router;