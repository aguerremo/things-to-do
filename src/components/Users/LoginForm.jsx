import loginService from "../../services/loginService"
import taskService from "../../services/taskService"
import { useState } from "react"

const LoginForm = ({ setUser, setTasks }) => {
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      taskService.setToken(user.token)
      console.log('User logged in:', user)
      const tasks = await taskService.getAll()
      setTasks(tasks)
      console.log('Tasks fetched:', tasks)

    } catch (error) {
      setError('Invalid username or password')
      console.error('Login error:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required /><br />
        <input type="password" name="password" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginForm