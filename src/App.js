import React, { useEffect, useState } from "react"
import { CssBaseline, IconButton, ListItem, TextField } from "@mui/material"
import { CheckBoxOutlined, CheckBoxOutlineBlankOutlined, DeleteForever, AddBox } from '@mui/icons-material'

import apiRequest from './apiRequest.js'

const NEW_TASK_CONSTANT = "ABCD"

export default function App() {

  const [tasks, setTasks] = useState([])

  const tasksOnMount = async () => {
    try {
      const data = await apiRequest("GET")
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setTasks([{ id: 1 }])
    }
  }
  useEffect(() => {
    tasksOnMount()
  }, [])

  //#region set tasks
  const updateTask = async (id, updates, saveToDB = true) => {
    const saveToDatabase = async (task) => {
      if (saveToDB) {
        try {
          const response = await apiRequest("PATCH", String(id), { ...task, ...updates })
          if (!response)
            throw new Error("Failed to save task")
          console.log("Task saved successfully:", response)
        } catch (error) {
          console.error("Error saving task:", error)
          // Optionally handle rollback if needed (e.g., show error to user)
        }
      }
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, ...updates }

          // Save to the DB in the background
          saveToDatabase(updatedTask)

          return updatedTask
        }
        return task
      })
    )
  }



  const createTask = async (task) => {
    const id = await apiRequest("POST", "", { ...task, id: Date.now() })

    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id ? { ...t, id: id } : t
      )
    )
  }

  const addTaskToList = async () => {
    // creating a new task, and NOT saving it (because its empty)
    const newId = NEW_TASK_CONSTANT + Date.now() //attaching a constant to know if its saved or not
    setTasks(prevTasks => [...prevTasks, { id: newId, text: "", completed: false }])
    return newId
  }

  const deleteTask = async (id) => {
    // TODO add a dialog
    // TODO then/catch because of no saving of task
    await apiRequest("DELETE", id)
      .then(() => {
        setTasks(tasks => tasks.filter((task) => task.id !== id))
      })
      .catch((error) => {
        setTasks(tasks => tasks.filter((task) => task.id !== id))
      })
  }
  //#endregion 

  const addButton = () => {
    return (
      <IconButton
        onClick={() => addTaskToList()}
      >
        <AddBox color="success" />
      </IconButton>
    )
  }

  // display a task
  const taskItem = ({ id, text, completed }) => {
    return (
      <ListItem variant="filled" divider>
        <IconButton onClick={() => { updateTask(id, { completed: !completed }) }}>
          {completed ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
        </IconButton>
        <TextField
          value={text}
          variant="outlined"
          style={{ textDecoration: completed ? "line-through" : "none" }}
          onChange={(e) => updateTask(id, { text: e.target.value }, false)}
          onBlur={() => {
            if (String(id).includes(NEW_TASK_CONSTANT) && text.trim() !== "") {
              createTask({ id, text, completed })
            } else if (id && text.trim() !== "") {
              updateTask(id, { text })
            }
          }} />
        <IconButton style={{ marginLeft: "20px" }} onClick={() => deleteTask(id)}>
          <DeleteForever />
        </IconButton>
      </ListItem>
    )
  }

  return (
    // <ThemeProvider theme={dark}></ThemeProvider> TODO
    <div style={{ display: 'block', alignItems: 'center', height: '100vh' }}>
      <CssBaseline>
        <h1>My Tasks</h1>
        {tasks.map(task => taskItem(task))}
        {addButton()}
      </CssBaseline>
    </div>
  )
}