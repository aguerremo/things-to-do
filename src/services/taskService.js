import axios from "axios"

const baseURL = "/api/"

const getAll = async () => {
  try {
    const response = await axios.get(`${baseURL}/getTask`)
    return response.data
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

const create = async (newTask) => {
  
  try {
    const response = await axios.post(`${baseURL}addTask`, newTask)
    return response.data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

const remove = async (task) => {
  try {
    const response = await axios.delete(`${baseURL}deleteTask/${task}`)
    return response.data
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

export default { getAll, create, remove }