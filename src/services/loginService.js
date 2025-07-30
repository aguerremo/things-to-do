import axios from 'axios'

const baseUrl = '/api/users/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
