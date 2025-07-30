import registerService from "../../services/registerService"
import { useState } from "react"

const RegisterForm = ({setShowForm, showForm}) => {
  const [notification, setNotification] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      username: e.target.elements.username.value,
      name: e.target.elements.name.value,
      password: e.target.elements.password.value
    }

    try {
      console.log('Registering user:', newUser)
      const user = await registerService.register(newUser)
      console.log('User registered succesfully:', user)
      setNotification('Registration successful! You can now log in.')
      setTimeout(() => {
        setNotification(null)
      }, 5000) // Clear notification after 5 seconds
      setShowForm(!showForm) // Close the registration form after successful registration

    } catch (error) {
      setNotification('Registration failed. Please try again.')
      setTimeout(() => {
        setNotification(null)
      }, 5000) // Clear error after 5 seconds
      
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
        {notification && <p className="error">{notification}</p>}
      </form>
    </div>
  )
}

export default RegisterForm