import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
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
    maxlength: 30,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task' // Referencia al modelo Task
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

userSchema.plugin(uniqueValidator, { message: 'Nombre de usuario ya existente.' }) // Asegura que el nombre de usuario sea único

const User = mongoose.model('User', userSchema)

export default User