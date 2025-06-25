import mongoose from 'mongoose'

const MONGO_DB_URI = process.env.MONGODB_URI
export async function connectDB() {
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.log('Conexión a MongoDB exitosa')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
}
