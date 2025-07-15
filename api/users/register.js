import { connectDB } from "../../utils/db/connectDB.js"
import User from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../utils/config.js"

export default async function handler(req, res) { //Exportamos la función handler para manejar las solicitudes HTTP
  if (req.method === "POST") { //Verificamos si el método de la solicitud es POST
    try {
      await connectDB() //Conectamos a la base de datos

      const { username, name, password } = req.body //Obtenemos los datos del cuerpo de la solicitud

      if (!username) { //Verificamos que todos los campos sean proporcionados
        return res.status(400).json({ error: "Username are required" })
      } else if (!name) {
        return res.status(400).json({ error: "Name are required" })
      } else if (!password) {
        return res.status(400).json({ error: "Password are required" })
      }

      const  existingUser = await User.findOne({ username }) //Verificamos si el usuario ya existe
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" })
      }

      const passwordHash = await bcrypt.hash(password, 10) //Hasheamos la contraseña

      const newUser = new User({
        username,
        name,
        passwordHash
      })

      const savedUser = await newUser.save() //Guardamos el nuevo usuario en la base de datos

      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '1h' }) //Generamos un token JWT para el usuario

      res.status(201).json({ token, user: { id: savedUser._id, username: savedUser.username, name: savedUser.name } }) //Respondemos con el token y los datos del usuario
    } catch (error) {
      console.error('Error registering user:', error)
      res.status(500).json({ error: 'Server error while registering user.' })
    }
  }
}