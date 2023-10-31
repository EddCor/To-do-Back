const Task = require("../models/Task.model")
const { isAuthenticated } = require('../middlewares/routeGuard.middleware');
const { route } = require("./task.routes");
const router = require("express").Router();




router.get("/userTask",isAuthenticated, async (req, res) =>{
  
 try {
const allTask = await Task.find({username:req.payload.userId})

res.status(200).json(allTask)
 } catch (error) {
    
    res.status(500).json({errorMessage: "internal server error"})
 }
})




//tocreate a new task (gett it in the DB)
  router.post('/', isAuthenticated, async (req, res) => {
    try {
       
      const newTask = await Task.create({...req.body,username: req.payload.userId})
  
      res.status(201).json({ task: newTask})
    } catch (error) {
      
      res.status(400).json({ error: 'Failed to create a Task' });
    }
  });



//update (edit) existing task
router.put('/:itemId', isAuthenticated, async (req, res) => {
    const { itemId } = req.params;
    const { name } = req.body;

    try {
      const item = await Task.findByIdAndUpdate(
        itemId,
        { itemName:name },
        { new: true }
      );

      if (!item) {
        return res.status(404).json({ message: 'Item not found or does not belong to the user' });
      }

      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the item' });
    }
});




//Delete the task
  router.delete("/:itemId", async (req, res) => {
    try {
      const { itemId } = req.params;
      
      
      const deletedItem = await Task.findByIdAndDelete(itemId);
      
  
      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  });
  
  

  module.exports = router;