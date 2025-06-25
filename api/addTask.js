import { connectDB } from "../utils/db/connectDB.js"
import Task from "../models/Task.js"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try{
      await connectDB()
      const { title, description, all_day } = req.body
      if (!title) {
        return res.status(400).json({ error: "Title required" })
      }

      const newTask = new Task({
        title,
        description,
        all_day: typeof all_day === 'boolean' ? all_day : false
      })

      const savedTask = await newTask.save()
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
}