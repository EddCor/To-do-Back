const Task = require("../models/Task.model")
const { isAuthenticated } = require('../middlewares/routeGuard.middleware');
const { route } = require("./task.routes");
const TaskDone = require("../models/TaskDone.model");
const router = require("express").Router();

router.get("/userTask",isAuthenticated, async (req, res) =>{
  
    try {
   const allTask = await Task.find({username:req.payload.userId})
   
   res.status(200).json(allTask)
    } catch (error) {
       
       res.status(500).json({errorMessage: "internal server error"})
    }
   })
   



   router.put('/:itemId', isAuthenticated, async (req, res) => {
    const { itemId } = req.params;
    const { done } = req.body;
console.log(done)
    try {
      const item = await Task.findByIdAndUpdate(
        itemId,
        { done:done },
        { new: true }
      );

      if (!item) {
        return res.status(404).json({ message: 'Item not found or does not belong to the user' });
      }
      const taskDone = await TaskDone.findOne({owner:req.payload.userId})
      
      if (taskDone && !taskDone.finishedTask.includes(item._id)){
        await TaskDone.findByIdAndUpdate(taskDone._id, {$push:{finishedTask:item._id}})
      }else if(taskDone && taskDone.finishedTask.includes(item._id)){
        await TaskDone.findByIdAndUpdate(taskDone._id, {$pull:{finishedTask:item._id}})
      }else {
        const newTaskDone = await TaskDone.create({owner:req.payload.userId, finishedTask:[item._id]})
      }
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the item' });
    }
});










module.exports = router;