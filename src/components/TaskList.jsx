import CompleteTask from "./CompleteTask"
import DeleteTask from "./DeleteTask"
import { useEffect } from "react"
import taskService from "../services/taskService"

const TaskList = ({tasks, setTasks}) => {

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const initialTasks = await taskService.getAll()
        setTasks(initialTasks)
      } catch (err){
        console.error('Error fetching tasks:', err)
      }
      }

    fetchTasks()
  }, [])

  const taskAllDay = tasks.map((task) => {task.all_day === true ? 'All day' : 'Not all day'})
  if (tasks !== null && tasks.length === 0) {
    return <p>There are no tasks</p>
  }
    return(
      <ul>
        <div >
          {tasks.map((task) => (
            <li key={task.id}> 
              {task.title} <br />
              {task.description} <br />
              {taskAllDay} <br />
              <CompleteTask />
              <DeleteTask />
            </li>
          ))}
        </div>     
      </ul>)
}


export default TaskList