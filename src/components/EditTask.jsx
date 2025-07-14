import taskService from "../services/taskService"
import { useState } from "react"

const EditTask = ({task, setTasks}) => {
     const [showForm, setShowForm] = useState(false)
  
     const handleClick = () => {
      setShowForm(!showForm)
    }
  const handleEdit = async (event) => {
    event.preventDefault()
    const updatedTask = {
      ...task,
      title: event.target.title.value,
      description: event.target.description.value
    }
    
    try {
      console.log('Updating task title:', updatedTask.title)
      console.log('Updating task description:', updatedTask.description)
      await taskService.update(updatedTask)
      console.log('Task updated:', updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
    }

    setTasks((prevTasks) => {
      return prevTasks.map(t => t.id === task.id ? updatedTask : t)
    })
    setShowForm(!showForm)

  }

  if (showForm === true) {
    console.log('clicked')
    
    return <div>
      <form onSubmit={handleEdit}>
      <input type="text" name="title" defaultValue={task.title} required />
      <textarea name="description" defaultValue={task.description} required />
      <button type="submit">Save</button>
    </form>
          <button onClick={handleClick}>Cancel</button>
    </div>
    
  } else {
  return (
    <div>
      <button onClick={handleClick}>Edit</button>
    </div>
  )
}
}

export default EditTask