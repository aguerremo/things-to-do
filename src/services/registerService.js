import axios from 'axios'

const baseUrl = '/api/users/register'

const register = async (newUser) => {
  try{
  console.log('URL:', `${baseUrl}`)
  console.log('New User:', newUser)
  const response = await axios.post(baseUrl, newUser)
  return response.data
} catch (error) {
  console.error("Error creating a new user:", error)
  throw error
}
}





export default { register }