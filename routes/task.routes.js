const Task = require("../models/Task.model")
const { isAuthenticated } = require('../middlewares/routeGuard.middleware');
const { route } = require("./task.routes");

const router = require("express").Router();

router.get("/userTask",isAuthenticated, async (req, res) =>{

 console.log(req.payload)   
 try {
const allTask = await Task.find({username:req.payload.userId})
console.log(allTask)
res.status(200).json(allTask)
 } catch (error) {
    console.log(error)
    res.status(500).json({errorMessage: "internal server error"})
 }
})




//tocreate a new task (gett it in the DB)
  router.post('/', isAuthenticated, async (req, res) => {
    try {
       
      const newTask = await Task.create({...req.body,username: req.payload.userId})
  
      res.status(201).json({ task: newTask})
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to create a Task' });
    }
  });





//update (edit) existing task
router.put('/:id', async (req, res) => {
    console.log(req.body)
    try {
      const responseFromAPI = await fetch(
        `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(req.body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (responseFromAPI.ok) {
        const characterFromAPI = await responseFromAPI.json()
        res.json({ character: characterFromAPI })
      }
    } catch (error) {
      console.error(error)
    }
  })


//Delete the task
  

  router.delete("/:itemId", async (req, res) => {
    try {
      const { itemId } = req.params;
      console.log (itemId)
      
      const deletedItem = await Task.findByIdAndDelete(itemId);
      console.log(deletedItem) 
  
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