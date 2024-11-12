// Dependencies
const mongoose = require('mongoose');

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export User model
module.exports = mongoose.model('User', userSchema);
