import { connectDB } from "../../utils/db/connectDB.js"
import Task from "../../models/Task.js"
import { authenticateToken } from "../../middleware/auth.js"

export default authenticateToken( async function handler(req, res) {
  if (req.method === "DELETE") {
  try {
      await connectDB()

      const userId = req.userId.id // Obtenemos el ID del usuario del token
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: "ID required" })
      }
      const deletedTask = await Task.findByIdAndDelete(id, userId)
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(200).json({ message: "Task deleted successfully", id: deletedTask._id })


    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ error: 'Error interno del servidor al eliminar task.' });
    }
  } else {
    res.setHeader("Allow", ["DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
})