// Authentication
const authMiddleware = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (auth !== process.env.AUTH_KEY) {
            next('Authentication Failed!');
        }
        next();
    } catch (error) {
        res.status(404).json({ message: 'Authentication Failed!' });
    }
};

// Export the middleware
module.exports = authMiddleware;
