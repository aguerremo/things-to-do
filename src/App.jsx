import './App.css'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import CreateButton from './components/CreateButton'
import { useState } from 'react'


const App = () => {
  const [tasks, setTasks] = useState([])

  return <div>
    <div>
    <h1>TTD</h1>
    </div>
    
    <CreateButton setTasks={setTasks} tasks={tasks}/>
    <TaskList tasks={tasks} setTasks={setTasks}/>
  
  </div>
}
export default App
