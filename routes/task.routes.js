// Dependencies
const express = require('express');
const {
    createtaskController,
    getAllTaskController,
    getSingleTaskController,
    updateTaskController,
    deleteTaskController,
} = require('../controllers/taskControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUpload');

// Initialize routes
const taskRouter = express.Router();

// Routes
taskRouter.post('/', authMiddleware, upload.single('image'), createtaskController);
taskRouter.get('/', authMiddleware, getAllTaskController);
taskRouter.get('/:id', authMiddleware, getSingleTaskController);
taskRouter.put('/:id', authMiddleware, updateTaskController);
taskRouter.delete('/:id', authMiddleware, deleteTaskController);

// Export the router
module.exports = taskRouter;
