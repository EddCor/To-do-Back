const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
    text: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date, 
        default: Date.now
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;
