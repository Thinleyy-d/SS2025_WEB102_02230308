// middleware/async.js
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);  // Catch async errors and pass them to the next middleware (error handler)
    };
};

module.exports = asyncHandler;
