// Dependencies
const Task = require('../models/taskModel');

// Controllers
// Create a new Task
const createtaskController = async (req, res) => {
    try {
        const { title, description, status, user } = req.body;
        const imagePath = req.file.path;

        // Input Validation
        if (title === undefined || title === null || title === '') {
            return res.status(400).send({ error: 'Title is required' });
        }
        if (imagePath === undefined || imagePath === null || imagePath === '') {
            return res.status(400).send({ error: 'Image is required' });
        }

        // Create a new Task
        const newTask = new Task({
            title,
            description,
            status,
            user,
            image: imagePath,
        });

        // Save the task in the database
        await newTask.save();

        // Response
        res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
        res.status(404).json({ message: 'Something went wrong' });
    }
};

// Fetch all the tasks
const getAllTaskController = async (req, res) => {
    try {
        const task = await Task.find({}).populate('user', '-password');

        // Response
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Fetch a single task
const getSingleTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if task exists in the database
        const existingTask = await Task.findById({ _id: id }).populate('user', '-password');
        if (!existingTask) {
            return res.status(404).send({ message: 'Task not found' });
        }

        // Response
        res.status(200).json(existingTask);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update a task without image
const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const reqBody = req.body;

        // let imgUrl = '';
        // if (req.file) {
        //     imgUrl = `uploads/${req.file.filename}`;
        // }
        // reqBody.image = imgUrl;

        const updatedData = await Task.findByIdAndUpdate({ _id: id }, reqBody, { new: true });
        if (!updatedData) {
            return res.status(404).send({ message: 'Task not found' });
        }
        // const userImgInfo = userInfo.image;
        // if (userImgInfo) {
        //     fs.unlinkSync('./', userImgInfo);
        // }

        // const updatedData = await Task.findOneAndUpdate({ _id: id }, reqBody, { new: true });

        res.status(200).json({ message: 'Task updated successfully', updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete a task
const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if task exists in the database
        const task = await Task.findByIdAndDelete({ _id: id });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        // Response
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Export the module
module.exports = {
    createtaskController,
    getAllTaskController,
    getSingleTaskController,
    updateTaskController,
    deleteTaskController,
};
