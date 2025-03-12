const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log the error to the console
    console.log(err);

    // Create a custom error response if no status code is provided
    if (!error.statusCode) {
        error = new ErrorResponse(error.message, 500);
    }

    // Send the response to the client
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
