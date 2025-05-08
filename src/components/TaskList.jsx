import CompleteTask from "./CompleteTask"
import DeleteTask from "./DeleteTask"



const TaskList = ({tasks}) => {
  tasks.map((task) => {
    if (task.all_day === true) {
      task.all_day = 'All day'
    } else {
      task.all_day = 'Not all day'
    }
  })
  if (tasks !== null && tasks.length === 0) {
    return <p>There are no tasks</p>
          
  } else {
    return(
      <ul>
        <div >
          {tasks.map((task) => (
              <li key={task.id}> {task.title} <br />{task.description} <br />{task.all_day} <br />
              <CompleteTask />
              <DeleteTask /></li>
            ))}
        </div>     
      </ul>)
}
}

export default TaskList