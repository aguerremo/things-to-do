import { connectDB, JWT_SECRET } from "../../utils/db/connectDB.js"
import User from "../../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      console.log('Conexión para registro a la base de datos exitosa')

      const { username, name, password } = req.body
      console.log('Datos recibidos:', { username, name })

      if (!username || !name || !password) {
        console.log('Faltan datos en la solicitud')
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('El usuario ya existe')
        return res.status(400).json({ error: 'El nombre de usuario ya existe' })
      }

      const passwordHash = await bcrypt.hash(password, 10)
      console.log('Contraseña hasheada:', passwordHash)

      const newUser = new User({
        username,
        name,
        passwordHash
      });
      console.log('Nuevo usuario:', newUser)

      const savedUser = await newUser.save()
      console.log('Usuario guardado:', savedUser)
      console.log('JWT_SECRET:', JWT_SECRET)
      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1h' })
      console.log('Token generado:', token)
      console.log('JWT:', JWT_SECRET)

      res.status(201).json({ token, user: { id: savedUser._id, username: savedUser.username, name: savedUser.name } })
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      res.status(500).json({ error: 'Error interno del servidor al registrar el usuario' })
    }
  }
}