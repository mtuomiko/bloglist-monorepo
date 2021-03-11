const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('', async (request, response, next) => {

  const body = request.body
  console.log(body)
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'password invalid, must be at least 3 chars long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter