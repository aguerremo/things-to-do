import TaskList from './components/TaskList'
import CreateButton from './components/CreateButton'
import Validation from './components/Users/Validation'
import { useEffect, useState } from 'react'
import Notification from './components/Notifications/Notification'
import './App.css';
import taskService from './services/taskService'


const App = () => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('user desde localStorage: ', user)
      console.log('token desde localStorage: ', user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h1>TTD</h1>
        <Notification error={error} setError={setError}/>
        <Validation setUser={setUser} setTasks={setTasks}/>
      </div>
    )
  }

  return <div>
    <div>
    <h1>TTD</h1>
    <p>{user.user.name} logged in</p>

    <button onClick={() => {
      setUser(null)
      taskService.setToken(null) // Limpia el token al cerrar sesión
      window.localStorage.removeItem('loggedAppUser') // Elimina el usuario del localStorage
      setTasks([]) //Limpia las tareas al cerrar sesión
      taskService.setToken(null) //Limpia el token del servicio de tareas
    }}>logout</button>
    
    </div>
    <Notification error={error} setError={setError}/>
    <CreateButton setTasks={setTasks} tasks={tasks}/>
    <TaskList tasks={tasks} setTasks={setTasks}/>
  
  </div>
}
export default App
