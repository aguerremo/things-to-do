import './App.css'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import CreateButton from './components/CreateButton'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  

  return <div>
    
    <h1>LOGO</h1>
    <CreateButton setTasks={setTasks} tasks={tasks}/>
    <TaskList tasks={tasks}/>
  
  </div>
}
export default App
