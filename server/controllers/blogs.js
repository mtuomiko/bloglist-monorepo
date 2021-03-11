const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('', async (request, response, next) => {
  try {
    const token = request.token

    if (!token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)

    if (!blog.likes) {
      blog.likes = 0
    }

    if (!blog.title && !blog.url) {
      return response.status(400).json({ error: 'both blog title and url missing' })
    }

    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    // Populate user info (manually) to blog before responding
    const jsonBlog = savedBlog.toJSON()

    jsonBlog.user = {
      id: user._id,
      name: user.name,
      username: user.username,
    }

    response.status(201).json(jsonBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'unauthorized to delete blogs by other users' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (!body.likes || (!body.title && !body.url)) {
    response.status(400).end()
  } else {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    try {
      // Populate response so it's similar to response of get all blogs function
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, { new: true }
      ).populate('user', { username: 1, name: 1 })

      if (updatedBlog) {
        response.json(updatedBlog.toJSON())
      } else {
        response.status(404).end()
      }
    } catch (exception) {
      next(exception)
    }

  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  if (!body.comment) {
    return response.status(401).json({ error: 'comment missing' })
  }

  try {
    await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: body.comment } }
    )
    response.status(201).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter