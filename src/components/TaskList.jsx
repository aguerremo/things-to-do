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
        setTasks([
          {
            id: 1,
            title: "Task 1",
            description: "Description for Task 1",
            all_day: true,
          },
          {
            id: 2,
            title: "Task 2",
            description: "Description for Task 2",
            all_day: false,
          },
        ])
      } catch (err){
        console.error('Error fetching tasks:', err)
      }
      }

    fetchTasks()
  }, [])

  if (tasks === null || tasks.length === 0) {
    return <p>There are no tasks</p>
  } else {
    return tasks.map((task) => {
      return(
      <div key={task.id} className="task">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <CompleteTask task={task} setTasks={setTasks} />
        <DeleteTask task={task} setTasks={setTasks}/>
      </div>)
  })
  }
}


export default TaskList