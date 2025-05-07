const AddTask = ({setTasks}) => {

  const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const task  = {
      title: e.target.elements.title.value,
      all_day: e.target.elements.all_day.checked,
      description: e.target.elements.description.value,
      id: generateId()
    }
    if (task) {
      console.log('Task added:', task)
      e.target.elements.title.value = ''
      e.target.elements.all_day.checked = false
      e.target.elements.description.value = ''

      setTasks((prevTasks) => [...prevTasks, task])
    }
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