// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import taskService from "../services/taskService"

const CompleteTask = ({task, setTasks}) => {
  const [checked, setChecked] = useState(task.checked || false);
  if(checked === true) {
    task.checked = true
    console.log('Task completed:', task.title)
    console.log(task.title, 'is completed:', task.checked)
  } else {
    task.checked = false
    console.log('Task not completed:', task.title)
    console.log(task.title, 'is completed:', task.checked)

  }
  const handleChecked = async (event) => {
    event.preventDefault()
    const newChecked = !checked;
    setChecked(newChecked);
    const updatedTask = {
      ...task,
      checked: newChecked
    }
    try{
      await taskService.update(updatedTask)
      console.log('Task updated:', updatedTask)
    } catch (error) {
      console.error('Error updating task:', error);
    }
  
    console.log("Check task with ID:", task.id)
    
    setTasks((prevTasks) => {
      return prevTasks.map(t => t.id === task.id ? updatedTask : t);
    })

  }

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleChecked} />
    </div>
  );
}
export default CompleteTask