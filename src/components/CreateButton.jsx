import AddTask from "./AddTask"
import { useState } from "react"

const CreateButton = ({setTasks}) => {
 const [showForm, setShowForm] = useState(false)

  const handleClick = () => {
    setShowForm(!showForm)
  }
  
  if (showForm === true) {
    console.log('clicked')
    
    return <div>
      <AddTask setTasks={setTasks}/>
    <button onClick={handleClick}>Cancel</button>

    </div>
    
  }

  return <div>
    <button onClick={handleClick}>Create new task</button>
    </div>

}

export default CreateButton