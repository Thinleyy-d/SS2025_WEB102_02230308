const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const {users, followers } = require('../utils/mockData');

// @desc Get all followers for a user
// @route GET /users/:id/followers
// @access Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    console.log(`Fetching followers for user ID: ${userId}`);

    // Validate user existence
    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
        return next(new ErrorResponse(`User with id ${userId} not found`, 404));
    }

    const userFollowers = followers.filter(follower => follower.following_id === userId);
    console.log(`Found followers:`, userFollowers);

    res.status(200).json({
        success: true,
        message: userFollowers.length ? "Followers found" : "No followers found",
        data: userFollowers
    });
});

