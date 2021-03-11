import blogService from '../services/blogs'
import commentService from '../services/comments'
import { showNotification } from './notificationReducer'

const sortByLikes = (state) => {
  state.sort((a, b) => b.likes - a.likes)
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG': {
      const updatedBlog = action.blog
      const blogId = updatedBlog.id
      const likedState = state.map(blog => (blog.id !== blogId) ? blog : updatedBlog)
      sortByLikes(likedState)
      return likedState
    }
    case 'CREATE_BLOG': {
      const newState = [...state, action.blog]
      sortByLikes(newState)
      return newState
    }
    case 'INIT_BLOGS': {
      const initState = [...action.data]
      sortByLikes(initState)
      return initState
    }
    case 'REMOVE_BLOG': {
      const removedState = state.filter(blog => blog.id !== action.blog.id)
      return removedState
    }
    case 'ADD_COMMENT': {
      const commentAddedBlog = action.blog
      return state.map(blog => (blog.id !== commentAddedBlog.id) ? blog : commentAddedBlog)
    }
    default:
      return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const modifiedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const returnedBlog = await blogService.update(modifiedBlog.id, modifiedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        blog: returnedBlog,
      })
      dispatch(showNotification(`Liked ${blog.title}`))
    } catch (exception) {
      //dispatch(showNotification(`Error updating ${blog.title}: ${exception.response.data.error}`, 'error'))
      dispatch(showNotification(`Error updating ${blog.title}: ${exception}`, 'error'))
    }
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blog)

      dispatch({
        type: 'CREATE_BLOG',
        blog: returnedBlog,
      })
      dispatch(showNotification(`Added new blog: ${returnedBlog.title}`))
    } catch (exception) {
      dispatch(showNotification(`Error adding new blog: ${exception}`, 'error'))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)

      dispatch({
        type: 'REMOVE_BLOG',
        blog: blog,
      })
      dispatch(showNotification(`Removed ${blog.title}`))
    } catch (exception) {
      //dispatch(showNotification(`Error removing ${blog.title}: ${exception.response.data.error}`, 'error'))
      dispatch(showNotification(`Error removing ${blog.title}: ${exception}`, 'error'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const modifiedBlog = {
        ...blog,
        comments: [...blog.comments, comment],
      }
      const payload = {
        comment,
      }
      await commentService.create(blog.id, payload)
      dispatch({
        type: 'ADD_COMMENT',
        blog: modifiedBlog,
      })
      dispatch(showNotification(`Added comment ${comment} to ${blog.title}`))
    } catch (exception) {
      dispatch(showNotification(`Error adding comment ${comment}: ${exception.response.data.error}`, 'error'))
    }
  }
}

export default blogReducer