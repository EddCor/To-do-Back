const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const taskSchema = new Schema(
    {
        itemName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date, 
        default: Date.now
    },
    username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    done:{type:Boolean}
});

const Task = model('Task', taskSchema);

module.exports = Task;
