import axios from 'axios'

const baseUrl = '/api/users'

const register = async newUser => {
  const { data } = await axios.post(`${baseUrl}/register`, newUser)
  return data
}

const login = async credentials => {
  const { data } = await axios.post(`${baseUrl}/login`, credentials)
  return data
}



export default { login, register }