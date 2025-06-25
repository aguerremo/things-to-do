import { connectDB } from "../utils/db/connectDB.js"
import Task from "../models/Task.js"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB()

      const tasks = await Task.find({})
      res.status(200).json(tasks)

    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener tareas' });
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}