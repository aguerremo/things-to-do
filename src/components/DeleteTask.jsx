const DeleteTask = ({ taskId, onDelete }) => {
  const handleDelete = () => {
    
      onDelete(taskId)
      .then(() => {
        console.log("Task deleted successfully");
      })
 
  };

  return (
    <button onClick={handleDelete} className="delete-task">
      Delete Task
    </button>
  );
}

export default DeleteTask