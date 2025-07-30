/* eslint-disable no-undef */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_DB_URI = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

export const JWT_SECRET = process.env.JWT_SECRET

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.log('Conexión a MongoDB exitosa')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
}
