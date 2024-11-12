// Dependencies
const express = require('express');
const {
    createUserController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteuserController,
    loginController,
} = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

// Initialize routes
const usersRouter = express.Router();

// Routes
usersRouter.post('/signup', createUserController);
usersRouter.post('/login', authMiddleware, loginController);
usersRouter.get('/', authMiddleware, getAllUsersController);
usersRouter.get('/:id', authMiddleware, getSingleUserController);
usersRouter.put('/:id', authMiddleware, updateUserController);
usersRouter.delete('/:id', authMiddleware, deleteuserController);

// Export the router
module.exports = usersRouter;
