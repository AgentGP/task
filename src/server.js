const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users/tasks')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to server"))

app.use(express.json())

const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

const port = 5000
app.listen(port, () => console.log("json server started"))


