import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  all_day: {
    type: Boolean,
    default: false,
  },

  //Otros campos nuevos para agregar...
})

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Task = mongoose.model('Task', taskSchema)

export default Task