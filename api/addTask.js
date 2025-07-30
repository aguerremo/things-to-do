import { connectDB } from "../utils/db/connectDB.js"
import Task from "../models/Task.js"
import { authenticateToken } from "../middleware/auth.js"
import User from "../models/User.js"

export default authenticateToken(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const userId = req.userId.id // Obtenemos el ID del usuario del token
  
  if (req.method === "POST") {
    try{
      await connectDB()

      const { title, description, all_day } = req.body

      if (!title) {
        return res.status(400).json({ error: "Title required" })
      }
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      const newTask = new Task({
        title,
        description,
        all_day: typeof all_day === 'boolean' ? all_day : false,
        user: userId, // Asignamos el ID del usuario al campo 'user'
      })

      const savedTask = await newTask.save()
      user.tasks.push(savedTask._id) // Agregamos la tarea al array de tareas del usuario
      await user.save() // Guardamos el usuario actualizado
      res.status(201).json(savedTask)
    }
   catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear la tarea' });
  }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
})