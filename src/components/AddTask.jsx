import taskService from "../services/taskService"

const AddTask = ({setTasks}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask  = {
      title: e.target.elements.title.value,
      all_day: e.target.elements.all_day.checked,
      description: e.target.elements.description.value,
    }
    const taskCreated = taskService.create(newTask)

    taskCreated
      .then((response) => {
        const taskSaved = response
        console.log('Task created:', response)
        e.target.elements.title.value = ''
        e.target.elements.all_day.checked = false
        e.target.elements.description.value = ''

        setTasks((prevTasks) => [...prevTasks, taskSaved])
      })
      .catch((error) => {
        console.error('Error creating task:', error)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Add a title"/><br />
        <input type="checkbox" name="all_day" value="All day"/>
          <label htmlFor="all_day">All day</label><br />
        <input type="description" name="description" placeholder="Add a description"/><br />
        <button type="submit">Add new Task</button>
      </form>

    </div>

  )
}

export default AddTask