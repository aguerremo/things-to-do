import TaskList from './components/TaskList'
import CreateButton from './components/CreateButton'
import Validation from './components/Users/Validation'
import { useState } from 'react'
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([])

  return <div>
    <div>
    <h1>TTD</h1>
    </div>
    <Validation />
    <CreateButton setTasks={setTasks} tasks={tasks}/>
    <TaskList tasks={tasks} setTasks={setTasks}/>
  
  </div>
}
export default App
