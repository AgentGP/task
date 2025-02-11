const express = require("express")
const fs = require("fs")
const tasksFile = "./src/tasks.json" //the correct path

/*
- get all
- get one (id)
- update (id)
- add (task)
- delete (id)
*/
const router = express.Router();

//get all
const getAllTasks = async () => {
  try {
    const data = await fs.readFileSync(tasksFile, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
    throw err
  }
}

router.get("/", async (req, res) => {
  const tasks = await getAllTasks()
  res.json(tasks)
});

//get one
router.get("/:id", async(req, res) => {
    const tasks = await getAllTasks()
    const id = parseInt(req.params.id)
    const task = tasks.filter(task => task.id === id)

    res.send("task #" + req.params.id + 
      ""//JSON.stringify(task)
    )
});

//update
router.patch("/:id", (req, res) => {});

//create
router.post("/", (req, res) => {});

//create
router.delete("/:id", (req, res) => {});

module.exports = router;
