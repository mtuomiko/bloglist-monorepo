import axios from './axiosConfig'
const baseUrl = '/api/blogs'

const create = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { create }
