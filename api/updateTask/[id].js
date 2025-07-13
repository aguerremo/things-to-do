import { connectDB } from "../../utils/db/connectDB.js"
import Task from "../../models/Task.js"

export default async function handler(req, res) {
  if (req.method === "PUT") {
  try {
      await connectDB()

      const { id } = req.query // Asegúrate de que el ID se pase como parte de la consulta
      const { checked } = req.body // Asegúrate de que el cuerpo de la solicitud contenga el campo 'checked'
      if (!id) {
        return res.status(400).json({ error: "ID required" })
      }
      const checkedTask = await Task.findByIdAndUpdate(
        id,
        { checked }, // Actualiza el campo 'checked' a true
        { new: true } // Devuelve el documento actualizado
      )
      if (!checkedTask) {
        return res.status(404).json({ error: "Task not found" })
      }

      res.status(200).json(checkedTask)


    } catch (error) {
      console.error('Error check:', error);
      res.status(500).json({ error: 'Server error trying update task.' })
    }
  } else {
    res.setHeader("Allow", ["PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}