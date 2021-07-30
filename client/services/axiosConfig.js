import axios from 'axios'
import store from '../store'

const instance = axios.create()

instance.interceptors.request.use(config => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  if (!loggedUserJSON) {
    return config
  }
  try {
    const user = JSON.parse(loggedUserJSON)
    if (!user.token) {
      return config
    }
    config.headers.Authorization = `bearer ${user.token}`
    return config
  } catch (e) {
    return config
  }
})

instance.interceptors.response.use(undefined, error => {
  const response = error.response
  if (response.status === 401 && response.config.url !== '/api/login') {
    store.dispatch({
      type: 'LOGOUT',
    })
  }
  return Promise.reject(error)
})

export default instance