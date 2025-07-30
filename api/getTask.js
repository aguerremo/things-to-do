import { connectDB } from "../utils/db/connectDB.js"
import Task from "../models/Task.js"
import { authenticateToken } from "../middleware/auth.js"

export default authenticateToken (async function handler(req, res) {
  const userId = req.userId.id // Obtenemos el ID del usuario del token

  if (req.method === "GET") {
    try {
      await connectDB()
      console.log('Conexión a la base de datos establecida correctamente')
      const tasks = await Task.find({user: userId}) // Filtramos las tareas por el ID del usuario
      console.log('Tareas obtenidas:', tasks)
      res.status(200).json(tasks)

    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener tareas' });
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
})