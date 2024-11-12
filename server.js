/*
    Project title: To-Do_List API
    Author: Monayem Hossain Limon
*/

// Dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const dbConfig = require('./config/dbConnection');
const errorHandler = require('./middlewares/errorHandlingMiddlleware');
const usersRouter = require('./routes/users.routes');
const taskRouter = require('./routes/task.routes');

// Initialize app
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
dbConfig();

// Routes
app.use('/api/users', usersRouter);
app.use('/api/tasks', taskRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
