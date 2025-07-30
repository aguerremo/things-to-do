import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/db/connectDB.js'

export const authenticateToken = (handler) => async (req, res) => {

  //Obtenemos el token del encabezado Authorization
  const authorization = req.headers.authorization
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7) //Quita los primeros 7 caracteres ('Bearer ')
  } else {
    // Si no hay token, lo dejamos como null
    token = null
    // Respondemos con un error 401
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  try {
    // Verificamos el token
    const decodedToken = jwt.verify(token, JWT_SECRET)

    //Confirmamos que el token tiene un id de usuario
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token invalid' })
    }

    // Si el token es válido, agregamos el usuario al request
    req.userId = { id: decodedToken.id }
    
    // Llamamos al handler original
    return handler(req, res)
  } catch (error) {
    // Si hay un error al verificar el token, respondemos con un error 401
    console.error('Authentication error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }

  }