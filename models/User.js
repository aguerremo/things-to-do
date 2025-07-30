import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_]+$/, // Permitir solo letras, números y guiones bajos
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  passwordHash: { //Guardamos el hash (proceso que convierte una contraseña en una cadena de caracteres única mediante el uso de una función hash criptográfica.)
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]

  //Otros campos nuevos para agregar...
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash // No enviar el hash de la contraseña al cliente
    delete ret.tasks // No enviar las tareas al cliente por defecto
  },
})

const User = mongoose.model('User', userSchema)

export default User