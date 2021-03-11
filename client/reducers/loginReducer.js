import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user

    case 'LOGOUT':
      return null

    case 'LOGIN_FAIL':
      return null

    case 'SET_USER':
      return action.user

    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const credentials = {
        username: username,
        password: password,
      }
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(showNotification(`Logged in as ${user.username}`))
      dispatch({
        type: 'LOGIN',
        user,
      })
    } catch (exception) {
      dispatch(showNotification('Login failure', 'error'))
      dispatch({
        type: 'LOGIN_FAIL',
      })
    }
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(showNotification(`Logged out as ${getState().user.username}`))
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const checkLogin = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        user
      })
    }
  }
}

export default loginReducer