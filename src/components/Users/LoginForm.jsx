import userService from "../../services/userService"
import taskService from "../../services/taskService"
import { useState } from "react"

const LoginForm = ({ setUser, setTasks }) => {
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value

    try {
      const user = await userService.login({ username, password })
      setUser(user)
      console.log('User logged in:', user)

      // Fetch tasks for the logged-in user
      const tasks = await taskService.getAll()
      setTasks(tasks)
    } catch (error) {
      setError('Invalid username or password')
      console.error('Login error:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required /><br />
        <input type="password" name="password" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginForm