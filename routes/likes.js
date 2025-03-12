const express = require('express');
const {
    getLikes,
    addLike,
    removeLike
} = require('../controllers/likeController');

const router = express.Router({ mergeParams: true });

// GET /posts/:id/likes
router.route('/')
    .get(getLikes)
    .post(addLike);

// DELETE /posts/:id/likes/:likeId
router.route('/:likeId')
    .delete(removeLike);

module.exports = router;