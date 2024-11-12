// Dependencies
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Controllers
// Ceate user
const createUserController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (username === undefined || username === null || username === '') {
            return res.status(400).send({ error: 'Username is required' });
        }
        if (password === undefined || password === null || password === '') {
            return res.status(400).send({ error: 'Password is required' });
        }

        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });

        // Save the user in the database
        await newUser.save();

        // Remove the password for security purpose
        newUser.password = undefined;

        // Response message
        res.status(201).send({ message: `${newUser.username} is a new user`, newUser });
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
};

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (username === undefined || username === null || username === '') {
            return res.status(400).send({ error: 'Username is required' });
        }
        if (password === undefined || password === null || password === '') {
            return res.status(400).send({ error: 'Password is required' });
        }

        // Check if a user with the given username exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Remove the password for security purpose
        existingUser.password = undefined;

        // Response message
        res.status(200).send({ message: 'Logged in successfully', existingUser });
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' });
    }
};

// Fetch users
const getAllUsersController = async (req, res) => {
    try {
        // Get all users from the database
        const users = await User.find({});

        if (!users) {
            return res.status(404).send({ error: 'No users found' });
        }

        // Response message
        res.status(200).send(users);
    } catch (error) {
        res.status(404).send({ error: 'Something went wrong' });
    }
};

// Fetch single user
const getSingleUserController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists in the database
        const existingUsers = await User.findById({ _id: id });
        if (!existingUsers) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Response message without password
        existingUsers.password = undefined;

        // Response message
        res.status(200).send(existingUsers);
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

// Update user
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists in the database
        const existingUser = await User.findById({ _id: id });
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

        // Update the user's details
        updatedUser.password = undefined;

        // Response message
        res.status(200).send({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

// delete user
const deleteuserController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists in the database
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Response message
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

// Export module
module.exports = {
    createUserController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteuserController,
    loginController,
};
