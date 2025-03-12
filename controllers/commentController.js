const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { comments } = require('../utils/mockData');

// @desc Get all comments for a post
// @route GET /post/:id/comments
// @access Public
exports.getComments = asyncHandler(async (req, res, next) => {
    const postId = req.params.id; // Get postId from URL parameter
    console.log(`Fetching comments for post ID: ${postId}`);

    const postComments = comments.filter(comment => comment.post_id === postId); // Use post_id instead of postId
    console.log(`Found comments:`, postComments);

    if (postComments.length === 0) {
        return next(new ErrorResponse(`No comments found for post with id of ${postId}`, 404));
    }

    res.status(200).json({
        success: true,
        data: postComments
    });
});

// @desc Get a single comment by ID
// @route GET /post/:id/comments/:commentId
// @access Public
exports.getComment = asyncHandler(async (req, res, next) => {
    const { id, commentId } = req.params;

    const comment = comments.find(c => c.post_id === id && c.id === commentId); // Use post_id instead of postId

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${commentId} for post with id of ${id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: comment
    });
});

// @desc Add a comment to a post
// @route POST /post/:id/comments
// @access Public
exports.createComment = asyncHandler(async (req, res, next) => {
    const { userId, content } = req.body;
    const postId = req.params.id; // Get postId from URL parameter

    // Validate input
    if (!userId || !content) {
        return next(new ErrorResponse('Please provide userId and content', 400));
    }

    const newComment = {
        id: (comments.length + 1).toString(), // Generate a new ID
        post_id: postId, // Use post_id instead of postId
        user_id: userId, // Use user_id instead of userId
        text: content, // Use text instead of content
        created_at: new Date().toISOString()
    };

    comments.push(newComment);

    res.status(201).json({
        success: true,
        data: newComment
    });
});

// @desc Update a comment by ID
// @route PUT /post/:id/comments/:commentId
// @access Public
exports.updateComment = asyncHandler(async (req, res, next) => {
    const { id, commentId } = req.params;
    const { content } = req.body;

    let comment = comments.find(c => c.post_id === id && c.id === commentId); // Use post_id instead of postId

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${commentId} for post with id of ${id}`, 404));
    }

    comment.text = content || comment.text; // Use text instead of content

    res.status(200).json({
        success: true,
        data: comment
    });
});

// @desc Delete a comment by ID
// @route DELETE /post/:id/comments/:commentId
// @access Public
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const { id, commentId } = req.params;

    const commentIndex = comments.findIndex(c => c.post_id === id && c.id === commentId); // Use post_id instead of postId

    if (commentIndex === -1) {
        return next(new ErrorResponse(`Comment not found with id of ${commentId} for post with id of ${id}`, 404));
    }

    comments.splice(commentIndex, 1);

    res.status(200).json({
        success: true,
        data: {}
    });
});