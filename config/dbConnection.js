// Dependencies
const mongoose = require('mongoose');

// Database Configuration
const dbConfig = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connection established');
    } catch (error) {
        console.log(`Error connecting to Database: ${error}`);
    }
};

// Export module
module.exports = dbConfig;
