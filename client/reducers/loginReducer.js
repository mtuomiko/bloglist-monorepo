import jwt_decode from 'jwt-decode'
import loginService from '../services/login'
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
    dispatch(showNotification(`Logged out as ${getState().user.username}`))
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const checkLogin = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (!loggedUserJSON) {
      return
    }

    const user = JSON.parse(loggedUserJSON)
    const decodedToken = jwt_decode(user.token)
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      dispatch({
        type: 'LOGOUT',
      })
      return
    }
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export default loginReducer