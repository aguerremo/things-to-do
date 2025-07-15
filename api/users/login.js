import { connectDB } from "../../utils/db/connectDB.js"
import User from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../utils/config.js"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB()

      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" })
      }

      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" })
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash)
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" })
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

      res.status(200).json({ token, user: { id: user._id, username: user.username, name: user.name } })
    } catch (error) {
      console.error('Error logging in:', error)
      res.status(500).json({ error: 'Server error while logging in.' })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}