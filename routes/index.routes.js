const router = require("express").Router();
const User = require('../models/User.model');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/", async (request, response) => {
  try {
    const User = await User.find();
    response.status(200).json(plants);
  } catch (error) {
    response.status(500).json({ error: "Status code: 500 (Internal Server Error)" });
  }
});

module.exports = router;
 