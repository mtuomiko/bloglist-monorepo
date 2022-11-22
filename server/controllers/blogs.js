const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('', middleware.tokenVerifier, async (request, response) => {
  const token = request.verifiedToken
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title && !blog.url) {
    response.status(400).json({ error: 'both blog title and url missing' })
    return
  }

  const user = await User.findById(token.id)
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
})

blogsRouter.delete('/:id', middleware.tokenVerifier, async (request, response) => {
  const token = request.verifiedToken
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== token.id.toString()) {
    return response.status(401).json({ error: 'unauthorized to delete blogs by other users' })
  }
  const user = await User.findById(token.id)
  const blogArrayIndex = user.blogs.findIndex(elem => elem.equals(blog._id))

  await Blog.findByIdAndRemove(request.params.id)

  // if user blog array has a reference to the blog to be deleted, remove it
  if (blogArrayIndex !== -1) {
    user.blogs.splice(blogArrayIndex, 1)
    await user.save()
  }

  return response.status(204).end()
})

blogsRouter.put('/:id', middleware.tokenVerifier, async (request, response) => {
  const body = request.body

  if (!body.likes) {
    return response.status(400).json({ error: 'likes missing' })
  }

  if (!body.title && !body.url) {
    return response.status(400).json({ error: 'both blog title and url missing' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  // Populate response so it's similar to response of get all blogs function
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true }
  ).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    return response.json(updatedBlog.toJSON())
  }

  response.status(404).json({ error: 'blog not found' })
})

blogsRouter.post('/:id/comments', middleware.tokenVerifier, async (request, response) => {
  const body = request.body

  if (!body.comment) {
    return response.status(400).json({ error: 'comment missing' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    { $push: { comments: body.comment } })
  if (!updatedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.status(201).end()
})

module.exports = blogsRouter
