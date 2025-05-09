import axios from "axios"

const baseURL = "/api"

const getAll = async () => {
  try {
    const response = await axios.get(`${baseURL}/getTask`)
    return response.data
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

const create = async (task) => {
  
  try {
    const response = await axios.post(`${baseURL}/${task.id}`, task)
    return response.data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

export default {getAll, create}