const express = require("express");
const cors = require('cors')
const tasksRoutes = require('./routes/tasksRoutes')

// This file is responsible for the server itself (listening and connecting the logic frontend <=> tasks.json)

const app = express()
app.use(cors({
  origin: process.env.REACT_APP_WEBSITE || "http://localhost:3000",  // Allow only this origin
}));
app.use(express.json())
app.use("/tasks", tasksRoutes)

const PORT = process.env.PORT || 5000 // the env isn't required
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});