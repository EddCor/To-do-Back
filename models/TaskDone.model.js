const { Schema, model } = require("mongoose");

const taskDoneSchema = new Schema(
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

const TaskDone = model('TaskDone', taskDoneSchema);

module.exports = TaskDone;
