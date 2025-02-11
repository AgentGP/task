import React, { useState } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { CheckBoxOutlined, CheckBoxOutlineBlankOutlined, DeleteForever, AddBox } from '@mui/icons-material';

export default function App() {

  const [tasks, setTasks] = useState([
    { id: 1, text: "Yes", completed: false },
    { id: 2, text: "Go With The Flow", completed: false },
    { id: 3, text: "Eminem As A Whole", completed: false },
  ])

  // yes i am the best!
  // console.log(tasks.map(({id, text}) => console.log(id + " " + text)))

  //#region set tasks
  const updateTask = (id, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    )
  }

  // showing a dialog before deleting
  const deleteTask = (id) => {
    // TODO add a dialog
    setTasks(tasks => tasks.filter((task) => task.id !== id))
  }
  //#endregion   


  // display a task
  const taskItem = ({ id, text, completed }) => {
    return (
      <ListItem variant="filled" divider>
        <IconButton onClick={() => updateTask(id, { completed: !completed })}>
          {completed ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
        </IconButton>
        <TextField
          value={text}
          variant="outlined"
          style={{ textDecoration: completed ? "line-through" : "none" }} //line-through when complete
          onChange={(e) => updateTask(id, {text: e.target.value})} //update text
          //onBlur={() => saveToCloud(id, {text: text})}
        />
        <IconButton style={{ marginLeft: "20px" }} onClick={() => deleteTask(id)}>
          <DeleteForever/>
        </IconButton>
      </ListItem>
    )
  }

  const addButton = () => {
    return (
      <IconButton
        onClick={() =>
          setTasks(prevTasks => {
            const newId = prevTasks.length > 0 ? prevTasks[prevTasks.length - 1].id + 1 : 1
            return [...prevTasks, { id: newId, text: "", completed: false }]
          })
        }
      >
        <AddBox color="success" />
      </IconButton>
    )
  }

  return (
    // <ThemeProvider theme={dark}></ThemeProvider> TODO
    <div style={{ display: 'block', alignItems: 'center', height: '100vh' }}>
      <h1>My Tasks</h1>
      {tasks.map(task => taskItem(task))}
      {addButton()}
    </div>
  )
}