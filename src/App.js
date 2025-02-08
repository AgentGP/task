import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { CheckBoxOutlined, CheckBoxOutlineBlankOutlined, DeleteForever } from '@mui/icons-material';

export default function App() {

  const [tasks, setTasks] = useState([
    { id: 1, text: "Yes", completed: false },
    { id: 2, text: "Go With The Flow", completed: false },
    { id: 3, text: "Eminem As A Whole", completed: false },
  ])

  // yes i am the best!
  // console.log(tasks.map(({id, text}) => console.log(id + " " + text)))

  //#region set tasks
  const toggleTaskCompletion = (id, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }
  const editComplete = (id, completed) =>
    toggleTaskCompletion(id, {completed: completed})
  const editText = (id, text) =>
    toggleTaskCompletion(id, {text: text})
  const deleteTask = (id) => 
    setTasks(tasks => tasks.filter((task) => task.id !== id))
  
  //const editSubStep = 
  //#endregion   


  // display a task
  const taskItem = ({ id, text, completed, steps }) => {
    return (
      <ListItem divider>
        <ListItemIcon onClick={() => toggleTaskCompletion(id, {completed: !completed})}>
          {completed ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
        </ListItemIcon>
        <TextField value = {text} variant="standard" onChange={(e) => {editText(e.target.value)} }/>
        <ListItemIcon style={{right: '50%'}}>
          <DeleteForever />
        </ListItemIcon>
        {steps != null && steps.map(task => taskItem(task))}
      </ListItem>
    )
  }

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map(task => taskItem(task))}
    </div>
  )
}