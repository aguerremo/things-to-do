const Notification = ({ error, setError }) => {
  const handleClose = () => {
    setError(null);
  };

  if (!error) return null;

  return (
    <div className="notification">
      <p>{error}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default Notification