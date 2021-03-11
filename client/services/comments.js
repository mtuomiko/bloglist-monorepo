import axios from 'axios'
const baseHost = BACKEND_URL
const baseUrl = `${baseHost}/blogs`

const create = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { create }
