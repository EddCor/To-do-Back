const { Schema, model } = require("mongoose");
const taskDoneSchema = new Schema(
    {

    finishedTask:{
        type:[Schema.Types.ObjectId],
    ref:"Task"
    } ,  
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }    


});

const TaskDone = model('TaskDone', taskDoneSchema);

module.exports = TaskDone;
