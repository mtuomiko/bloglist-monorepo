import axios from 'axios'
const baseHost = BACKEND_URL
const baseUrl = `${baseHost}/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }