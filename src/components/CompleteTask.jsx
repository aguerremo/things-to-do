const CompleteTask = ({ task, onComplete }) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <div>
      <button name="completebutton" onClick={handleComplete}>✓</button>
    </div>
  );
}
export default CompleteTask