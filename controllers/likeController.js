const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { likes } = require('../utils/mockData');

// @desc Get all likes for a post
// @route GET /posts/:id/likes
// @access Public
exports.getLikes = asyncHandler(async (req, res, next) => {
    const postId = req.params.id; // Get postId from URL parameter
    console.log(`Fetching likes for post ID: ${postId}`);

    const postLikes = likes.filter(like => like.post_id === postId); // Ensure the field name is correct
    console.log(`Found likes:`, postLikes);

    if (postLikes.length === 0) {
        return next(new ErrorResponse(`No likes found for post with id of ${postId}`, 404));
    }

    res.status(200).json({
        success: true,
        data: postLikes
    });
});

// @desc Add a like to a post
// @route POST /posts/:id/likes
// @access Public
exports.addLike = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
    const postId = req.params.id; // Get postId from URL parameter

    // Validate input
    if (!userId) {
        return next(new ErrorResponse('Please provide userId', 400));
    }

    const newLike = {
        id: (likes.length + 1).toString(), // Generate a new ID
        user_id: userId,
        post_id: postId,
        created_at: new Date().toISOString()
    };

    likes.push(newLike);

    res.status(201).json({
        success: true,
        data: newLike
    });
});

// @desc Remove a like from a post
// @route DELETE /posts/:id/likes/:likeId
// @access Public
exports.removeLike = asyncHandler(async (req, res, next) => {
    const { id, likeId } = req.params;

    const likeIndex = likes.findIndex(like => like.post_id === id && like.id === likeId);

    if (likeIndex === -1) {
        return next(new ErrorResponse(`Like not found with id of ${likeId} for post with id of ${id}`, 404));
    }

    likes.splice(likeIndex, 1);

    res.status(200).json({
        success: true,
        data: {}
    });
});