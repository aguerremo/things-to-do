import CompleteTask from "./CompleteTask"
import DeleteTask from "./DeleteTask"



const TaskList = ({tasks}) => {

        if (tasks !== null && tasks.length === 0) {
          return <p>There are no tasks</p>
          
        } else {
          return(
        <ul>
          <div >
          {tasks.map((task) => (
                <li key={task.id}> {task.title} <br />
                {task.description}  
                <CompleteTask />
                <DeleteTask /></li>
            ))}
         
          </div>
            
        </ul>)
}
}

export default TaskList