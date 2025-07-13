import taskService from "../services/taskService"

const DeleteTask = ({ task, setTasks }) => {
  const handleDelete = async (event) => {
    event.preventDefault()
    console.log("Deleting task with ID:", task.id)
    try {
      await taskService.remove(task.id)
      console.log('Task deleted:', task.id)
      setTasks((prevTasks) => [...prevTasks.filter(t => t.id !== task.id)])
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete Task
    </button>
  );
};

export default DeleteTask