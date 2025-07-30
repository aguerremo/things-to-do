import axios from "axios"

const baseURL = "/api/"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = token //Establece el token en los headers de Axios
  if (newToken === null || newToken === undefined) {
    delete axios.defaults.headers.common['Authorization'] //Elimina el token si es null o undefined
  }

}

const getAll = async () => {
  try {
    const response = await axios.get(`${baseURL}getTask`)
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

const update = async (updatedTask) => {
  try {
    const response = await axios.put(`${baseURL}updateTask/${updatedTask.id}`, updatedTask)
    return response.data
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export default { getAll, create, remove, update, setToken }