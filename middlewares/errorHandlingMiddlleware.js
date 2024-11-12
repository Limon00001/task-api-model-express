// Error handling middleware
const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: 'An error occurs! Please try again later.',
    });
    next();
};

// Export module
module.exports = errorHandler;
