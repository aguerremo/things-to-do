import userService from "../../services/userService"
import { useState } from "react"

const RegisterForm = ({ setUser }) => {
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const name = e.target.elements.name.value
    const password = e.target.elements.password.value

    try {
      const user = await userService.register({ username, name, password })
      setUser(user)
      console.log('User registered succesfully:', user)
    } catch (error) {
      setError('Registration failed')
      console.error('Registration error:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required /><br />
        <input type="text" name="name" placeholder="Name" required /><br />
        <input type="password" name="password" placeholder="Password" required /><br />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegisterForm