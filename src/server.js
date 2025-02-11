const express = require("express");
const tasksRoutes = require('./routes/tasksRoutes')

// This file is responsible for the server itself (listening and connecting the logic frontend <=> tasks.json)

const app = express()
app.use("/tasks", tasksRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});