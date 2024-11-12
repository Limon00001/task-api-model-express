// Dependencies
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Todo Schema
const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Completed', 'In Progress', 'Not Completed'],
            default: 'Completed',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Export the schema
module.exports = mongoose.model('Task', taskSchema);
