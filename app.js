
require("dotenv").config();


require("./db");


const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/task", taskRoutes);

const taskDoneRoutes = require("./routes/taskDone.routes");
app.use("/taskDone", taskDoneRoutes);



require("./error-handling")(app);

module.exports = app;
