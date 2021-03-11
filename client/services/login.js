import axios from 'axios'
const baseHost = BACKEND_URL
const baseUrl = `${baseHost}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }