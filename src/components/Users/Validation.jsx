import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useState } from 'react'


const Validation = () => {

    const [showForm, setShowForm] = useState(false)
   
     const handleClick = () => {
       setShowForm(!showForm)
     }
     
     if (showForm === true) {
       console.log('clicked')
       
       return <div>
             <RegisterForm />
              <button onClick={handleClick}>Cancel</button>
       </div>
       
     } 
   
     return <div>
        <div>
          <h2>Welcome to TTD</h2>
          <p>Please log in or register to continue.</p>
          <LoginForm />
          <button onClick={handleClick}>Register</button>
       </div>
       </div>
   
    }
export default Validation