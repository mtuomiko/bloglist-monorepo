import userService from '../services/users'

// Listens also for blog creations and removals, then updates users state
const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      const initState = [...action.data]
      return initState
    }
    case 'CREATE_BLOG': {
      const userWithCreatedBlog = state.find(user => (user.id === action.blog.user.id))
      userWithCreatedBlog.blogs = [...userWithCreatedBlog.blogs, action.blog]

      const createdState = state.map(user => (user.id !== userWithCreatedBlog.id)
        ? user
        : userWithCreatedBlog
      )
      return createdState
    }
    case 'REMOVE_BLOG': {
      const userWithRemovedBlog = state.find(user => (user.id === action.blog.user.id))
      const filteredBlogs = userWithRemovedBlog.blogs.filter(blog => blog.id !== action.blog.id)
      userWithRemovedBlog.blogs = filteredBlogs

      const removedState = state.map(user => (user.id !== userWithRemovedBlog.id)
        ? user
        : userWithRemovedBlog
      )
      return removedState
    }
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default userReducer