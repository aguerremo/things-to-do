import CompleteTask from "./CompleteTask"
import DeleteTask from "./DeleteTask"
import { useEffect } from "react"
import taskService from "../services/taskService"

const TaskList = ({tasks, setTasks}) => {

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const initialTasks = await taskService.getAll()
        console.log('initialTasks: ', initialTasks)
        setTasks(initialTasks)
      } catch (err){
        console.error('Error fetching tasks:', err)
      }
      }

    fetchTasks()
  }, [])

  if (tasks === null || tasks.length === 0) {
    return <p>There are no tasks</p>
  } else {
    return tasks
    .filter(task => task != null)
    .map((task) => {
      if (!task) {
        return null
      }
      return (
        <div key={task.id} className="task-list">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <CompleteTask task={task} setTasks={setTasks} />
          <DeleteTask task={task} setTasks={setTasks} />
        </div>
      )
  })
  }
}

export default TaskList