const express = require("express")
const fs = require("fs")
const tasksDB = "./src/tasksDB.json" //the correct path

/*
- get all
- get one (id)
- update (id)
- add (task)
- delete (id)
*/
const router = express.Router();

// Helper - Read DB
const readDB = () => {
  const data = fs.readFileSync(tasksDB);
  return JSON.parse(data);
};

// Helper - Write DB
const writeDB = (data) => {
  fs.writeFileSync(tasksDB, JSON.stringify(data, null, 2));
};

// Get All
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

// Add
router.post('/', (req, res) => {
  const db = readDB();
  const newTask = { id: Date.now(), text: req.body.text, completed: false };
  db.tasks.push(newTask);
  writeDB(db);
  res.json(newTask);
});

// Update
router.patch('/:id', (req, res) => {
  const db = readDB();
  const taskIndex = db.tasks.findIndex(task => task.id == req.params.id);

  if (taskIndex !== -1) {
      db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
      writeDB(db);
      res.json(db.tasks[taskIndex]);
  } else {
      res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
router.delete('/:id', (req, res) => {
  const db = readDB();

  const deletedText = (db.tasks.find(task => task.id == req.params.id)).text; //returns task => task.text

  db.tasks = db.tasks.filter(task => task.id != req.params.id);
  writeDB(db);
  res.json({ message: `Task ${deletedText} deleted` });
});

module.exports = router;